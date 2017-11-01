var fs = require('fs');
var filer = require("./../codeBlockProcessor/fileContentReader");
var parser = require("./../codeBlockProcessor/methodLevelExtractor");
var type2Tokenizer = require('./../tokenProcessor/type2Tokenizer');
var detector = require("./../similarityCalculator/cloneDetectoOverlapSimilarityr");



var inputDirectoryPath = 'D:\\Masters\\MastersLab\\MastersNodeJSWork\\JSCMiner\\tokenProcessor';
var outputClonePath = 'D:\\Clone-type-2.txt';

//get all file content*/
var list = filer.getJSFilesWithContent(inputDirectoryPath);
//get all methods from the code
var methodList = new Array();
list.forEach(function (element) {
    var methods = parser.getMethodSetByExtractingJSFiles(element);
    methods.forEach(function (method) {
        methodList.push(method);
    });
});


methodList.forEach(function(method,index){
    method.setMethodID(index);
});


//for each method get its token array and hash values.
var start = new Date();
console.log(start);
methodList.forEach(function (method) {
    var parametricArray=type2Tokenizer.getParametricPlusIdentifiersTokenize(method.methodCode)
    method.setTokenParametricArray(parametricArray);
});
var end = new Date();
console.log(end);
console.log("Tokenizeing time");
console.log((end.getTime() - start.getTime()) / 1000);


var startDetecting = new Date();
var clonePair = new Array();
threashold = 1;
methodList.forEach(function (method) {
    methodList.forEach(function (candidate) {
        if (method.methodID < candidate.methodID) {
            if ((method != undefined) && (candidate != undefined)) {

                if (isPerametricArraysEqual(method.tokenParametricArray,candidate.tokenParametricArray)) {
                    clonePair.push({'ID_1':method.methodID,'ID_2':candidate.methodID,'first': method, 'second': candidate});
                }
            }

        }
    });
});



function isPerametricArraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.

    for (var i = 0; i < a.length; ++i) {
        if ((a[i].type !== b[i].type)||(a[i].value !== b[i].value)) return false;
    }
    return true;
}


var endDetecting = new Date();

console.log("Detection Done");
console.log((endDetecting.getTime() - startDetecting.getTime()) / 1000);
console.log(clonePair.length);
clonePair.forEach(function (pair) {

    var clone =pair.ID_1 +'\n' + pair.ID_2+'\n' +pair.first.methodCode + '\n' + pair.second.methodCode + '\n'+"-----------------------------------" +'\n';
    fs.appendFileSync(outputClonePath, clone);
});


var debug = 0;