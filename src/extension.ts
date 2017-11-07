'use strict';

import { workspace, languages, commands, ExtensionContext, Disposable } from 'vscode';
import ContentProvider, { encodeLocation } from './provider';


import * as vscode from 'vscode';
import window = vscode.window;
import QuickPickItem = vscode.QuickPickItem;
import QuickPickOptions = vscode.QuickPickOptions;
import Document = vscode.TextDocument;
import Position = vscode.Position;
import Range = vscode.Range;
import Selection = vscode.Selection;
import TextDocument = vscode.TextDocument;
import TextEditor = vscode.TextEditor;



export function activate(context: ExtensionContext) {

	const provider = new ContentProvider();

	// register content provider for scheme `references`
	// register document link provider for scheme `references`
	const providerRegistrations = Disposable.from(
		workspace.registerTextDocumentContentProvider(ContentProvider.scheme, provider),
		languages.registerDocumentLinkProvider({ scheme: ContentProvider.scheme }, provider)
	);

	// register command that crafts an uri with the `references` scheme,
	// open the dynamic document, and shows it in the next editor
	const commandRegistration = commands.registerTextEditorCommand('extension.detectClones', MainFunctions);
	


function performExtention(editor)
{
	
	const uri = encodeLocation(editor.document.uri, editor.selection.active);
	let path=workspace.openTextDocument(uri).then(doc => window.showTextDocument(doc, editor.viewColumn + 1));
	return path;
	
}


function MainFunctions(editor) {
    
    
    //check if a file is opened or not
	if (!vscode.window.activeTextEditor) {
		vscode.window.showInformationMessage('Open a file first to manipulate text selections');
		return;
	}      
    
    var activeEditor = vscode.window.activeTextEditor;
    var activeDocument= activeEditor.document;
    var selectedLines = activeEditor.selections;
	
	var opts: QuickPickOptions = { matchOnDescription: true, placeHolder: "What do you want to do to the selection(s)?" };
	var items: QuickPickItem[] = [];
	
	items.push({ label: "Detect Type-I Clones", description: "Find extact code clones" });
	items.push({ label: "Detect Type-II Clones", description: "Find renamed code clones" });
    items.push({ label: "Detect Type-III Clones", description: "Find gapped or near mismatch code clones" });
    
    var codeBlock=getCode(activeEditor, activeDocument, selectedLines);
    if(!codeBlock)
    {
		vscode.window.showQuickPick(items).then((selection) => {
			if (!selection) {
				return;
			}
			
			switch (selection.label) {
				case "Detect Type-I Clones":
				vscode.window.showInformationMessage("Type-I");
				performExtention(editor);
					break;
				case "Detect Type-II Clones":
				vscode.window.showInformationMessage("Type-II");
				performExtention(editor);
					break;
				case "Detect Type-III Clones":
				vscode.window.showInformationMessage("Type-III");
				performExtention(editor);
					break;
				default:
					console.log("hum this should not have happend - no selection")
					break;
			}
		});
	}else
	{
		vscode.window.showInformationMessage("code selected");
		performExtention(editor);
	}

	
	
}





function getCode(activeEditor, activeDocument, selectedLines) {
    var txt;
		for (var x = 0; x < selectedLines.length; x++) {
			 txt = activeDocument.getText(new vscode.Range(selectedLines[x].start, selectedLines[x].end));   
		}
    return txt;
}















	context.subscriptions.push(
		provider,
		commandRegistration,
		providerRegistrations
	);
}