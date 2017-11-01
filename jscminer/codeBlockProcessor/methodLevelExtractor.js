module.exports.getMethodSetByExtractingJSFiles = getMethodSetByExtractingJSFiles;

var esprima = require('esprima');
var estraverse = require('estraverse');
var escodegen = require('escodegen');
var model = require('./../model/method');

function getMethodSetByExtractingJSFiles(File) {
    var methodSet = new Array();
    var ast;
    var jsRawCode = File.getContent();
    try {
        ast = esprima.parse(jsRawCode, {loc: true, tokens: true});
    } catch (error) {
       // console.log(File.getFilePath());
        return methodSet;
    }
    estraverse.traverse(ast, {
        enter: function (node, parent) {
            if (node.type == 'FunctionExpression' || node.type == 'FunctionDeclaration') {
                var method = getExtractedFunction(node, File);
                if (method != null) {
                    methodSet.push(method);
                }

            }
        }
    });

    return methodSet;
}

function getExtractedFunction(node, File) {
    var method = new model.Method(File.fileID, File.fileName, File.filePath);
    var methodName = node.id ? node.id.name : "anonymous_functions";
    var startLine = node.loc.start.line;
    var endLine = node.loc.end.line;
    var methodLength = (endLine - startLine);
    var methodCode = escodegen.generate(node);
    method.setMethodName(methodName);
    method.setStartLine(startLine);
    method.setEndLine(endLine);
    method.setMethodCode(methodCode);
    method.setMethodLength(methodLength);

    return method;
}


