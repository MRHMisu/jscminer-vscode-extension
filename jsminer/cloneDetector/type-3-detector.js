var fs = require('fs');
var filer = require("./../codeBlockProcessor/fileContentReader");
var parser = require("./../codeBlockProcessor/methodLevelExtractor");
var type3Tokenizer = require('./../tokenProcessor/type3Tokenizer');
var detector = require("./../similarityCalculator/cloneDetectoOverlapSimilarityr");

var inputDirectoryPath = 'E:\\All Store\\js_dataset\\1.5K';
var outputClonePath = 'D:\\Clone-type-3.txt';

var list = filer.getJSFilesWithContent(inputDirectoryPath);

var methodList = new Array();
list.forEach(function (element) {
    var methods = parser.getMethodSetByExtractingJSFiles(element);
    methods.forEach(function (method) {
        methodList.push(method);
    });
});

methodList.forEach(function (method, index) {
    method.setMethodID(index);
});

var start = new Date();
console.log(start);
methodList.forEach(function (method) {
    var tokenFrequencyMap = type3Tokenizer.getTokenFrequencyMap(method.methodCode);
    //add desired token with the method;
    method.setTokenFrequencyMap(tokenFrequencyMap);
});

var end = new Date();
console.log(end);
console.log("Tokenizeing time");
console.log((end.getTime() - start.getTime()) / 1000);

console.log("---------total methods---"+methodList.length);

var startDetecting = new Date();
var threashold =0.80;
var clonePair = new Array();

methodList.forEach(function (method) {
    methodList.forEach(function (candidate) {
        if (method.methodID < candidate.methodID) {
            if ((method != undefined) && (candidate != undefined)) {
                var isClone = detector.detectClone(method.tokenFrequencyMap, candidate.tokenFrequencyMap, threashold);
                if (isClone) {
                    clonePair.push({'first': method, 'second': candidate});
                }
            }

        }
    });
});

var endDetecting = new Date();
console.log("Detection Done");
console.log((endDetecting.getTime() - startDetecting.getTime()) / 1000);
console.log(clonePair.length);
/*clonePair.forEach(function (pair) {

    var clone = pair.first.methodID + '\n' + pair.second.methodID + '\n' +
        pair.first.fileName + "," + pair.first.startLine + "," + pair.first.endLine + '\n' +
        pair.second.fileName + "," + pair.second.startLine + "," + pair.second.endLine + '\n' +
        pair.first.methodCode + '\n' + pair.second.methodCode
        + '\n' + "----------------------------------------------------------------------" + '\n';
    fs.appendFileSync(outputClonePath, clone);
});*/


var debug = 0;