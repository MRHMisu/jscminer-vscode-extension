'use strict';

var jscminer=require('./jscminer/main.js');

import * as vscode from 'vscode';
import ReferencesDocument from './referencesDocument';

export default class Provider implements vscode.TextDocumentContentProvider, vscode.DocumentLinkProvider {

	static scheme = 'references';

	private _onDidChange = new vscode.EventEmitter<vscode.Uri>();
	private _documents = new Map<string, ReferencesDocument>();
	private _editorDecoration = vscode.window.createTextEditorDecorationType({ textDecoration: 'underline' });
	private _subscriptions: vscode.Disposable;

	constructor() {

		// Listen to the `closeTextDocument`-event which means we must
		// clear the corresponding model object - `ReferencesDocument`
		this._subscriptions = vscode.workspace.onDidCloseTextDocument(doc => this._documents.delete(doc.uri.toString()));
	}

	dispose() {
		this._subscriptions.dispose();
		this._documents.clear();
		this._editorDecoration.dispose();
		this._onDidChange.dispose();
	}

	// Expose an event to signal changes of _virtual_ documents
	// to the editor
	get onDidChange() {
		return this._onDidChange.event;
	}

	// Provider method that takes an uri of the `references`-scheme and
	// resolves its content by (1) running the reference search command
	// and (2) formatting the results
	provideTextDocumentContent(uri: vscode.Uri): string | Thenable<string> {
		console.log(" provideTextDocumentContent----called");
		// already loaded?
		let document = this._documents.get(uri.toString());
		if (document) {
			return document.value;
		}

		var inputDirectoryPath=vscode.workspace.workspaceFolders[0].uri.fsPath;
        var outputDirectoryPath=inputDirectoryPath+"\\clone.txt";
        var clonePairs=jscminer.getDetectedClones(inputDirectoryPath,outputDirectoryPath,0.80);
        //vscode.window.showInformationMessage("Detection Done");

	
		let locations=[];
		clonePairs.forEach(function (pair) {

			let firstLocation=getLocationByMethod(pair.first);
			let secondLocation=getLocationByMethod(pair.second);
			locations.push(firstLocation,secondLocation);
			
		});
		

		function getLocationByMethod(method)
		{
			let uri=vscode.Uri.parse("file://"+method.filePath)
			let startLine=new vscode.Position(method.startLine,method.startLine);
			let endLine=new vscode.Position(method.endLine,method.endLine);
			let firstRange= new vscode.Range(startLine,endLine);
			let firstLocation= new vscode.Location(uri,firstRange);

			return firstLocation;
		}

		let document_test = new ReferencesDocument(uri, locations, this._onDidChange);
		this._documents.set(uri.toString(), document_test);
		return document_test.value;

		
	}



	private static _compareLocations(a: vscode.Location, b: vscode.Location): number {
		if (a.uri.toString() < b.uri.toString()) {
			return -1;
		} else if (a.uri.toString() > b.uri.toString()) {
			return 1;
		} else {
			return a.range.start.compareTo(b.range.start)
		}
	}

	provideDocumentLinks(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.DocumentLink[] {
		console.log(" provideDocumentLinks----called");
		// While building the virtual document we have already created the links.
		// Those are composed from the range inside the document and a target uri
		// to which they point
		const doc = this._documents.get(document.uri.toString());
		if (doc) {
			return doc.links;
		}
	}
}

let seq = 0;

export function encodeLocation(uri: vscode.Uri, pos: vscode.Position): vscode.Uri {
	
	console.log(" encodeLocation----called");
	const query = JSON.stringify([uri.toString(), pos.line, pos.character]);
	return vscode.Uri.parse(`${Provider.scheme}:References.locations?${query}#${seq++}`);
}

export function decodeLocation(uri: vscode.Uri): [vscode.Uri, vscode.Position] {
	console.log(" decodeLocation----called");
	let [target, line, character] = <[string, number, number]>JSON.parse(uri.query);
	return [vscode.Uri.parse(target), new vscode.Position(line, character)];
}