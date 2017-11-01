module.exports.getDetectedClones=getDetectedClones;

var fs = require('fs');
var fileContentReader = require("./codeBlockProcessor/fileContentReader");
var soureCodeParser = require("./codeBlockProcessor/methodLevelExtractor");
var tokenizerTypeOne = require('./tokenProcessor/type1Tokenizer');
var tokenizerTypeTwo = require('./tokenProcessor/type2Tokenizer');
var tokenizerTypeThree = require('./tokenProcessor/type3Tokenizer');
var cloneDetector = require("./similarityCalculator/cloneDetectoOverlapSimilarityr");
var util=require("./util/util.js");


function getDetectedClones(inputDirectoryPath,outputClonePath,threashold){
    var methodList=getMethodList(inputDirectoryPath);
    var  tokenizedMethodList=getTokenizedMethodList(methodList);
    var clonePairs=getDetectedClonePairs(tokenizedMethodList,threashold);
    writeClonePairs(clonePairs,outputClonePath,);

}


function getMethodList(inputDirectoryPath){
    var startTimeForFileReading=new Date();
    console.log("File Content reading and extracting has started at =: " +startTimeForFileReading);
    var soureFileList = fileContentReader.getJSFilesWithContent(inputDirectoryPath);
    var methodList = new Array();
    soureFileList.forEach(function (element) {
        var methods = soureCodeParser.getMethodSetByExtractingJSFiles(element);
        methods.forEach(function (method) {
            methodList.push(method);
        });
    });
    methodList.forEach(function (method, index) {
        method.setMethodID(index);
    });
    var endTimeForFileReading=new Date();
    console.log("File Content reading and extracting has ended at =: " +endTimeForFileReading);
    return methodList;
}

function getTokenizedMethodList(methodList){
    var startTimeForTokenizing = new Date();
    console.log("Tokenizing has started at =: " +startTimeForTokenizing);
    methodList.forEach(function (method) {
        var hash = tokenizerTypeOne.getHasHValueOfToken(method.methodCode);
        method.setTokenHashValue(hash);
        var parametricArray = tokenizerTypeTwo.getParametricPlusIdentifiersTokenize(method.methodCode)
        method.setTokenParametricArray(parametricArray);
        var tokenFrequencyMap = tokenizerTypeThree.getTokenFrequencyMap(method.methodCode);
        method.setTokenFrequencyMap(tokenFrequencyMap);
    });
    var endTimeForTokenizing = new Date();
    console.log("Tokenizing has ended at =: "+endTimeForTokenizing);
    console.log("Total time is required to tokenize =: "+((endTimeForTokenizing.getTime() - startTimeForTokenizing.getTime()) / 1000));
    return methodList;
}

function getDetectedClonePairs(tokenizedMethodList,threashold){
    var startTimeForCloneDetecting = new Date();
    console.log("Clone Detection has started at =: " +startTimeForCloneDetecting);
    var clonePairs = new Array();
    tokenizedMethodList.forEach(function (method) {
        tokenizedMethodList.forEach(function (candidate) {
            if (method.methodID < candidate.methodID) {
                if ((method != undefined) && (candidate != undefined)) {
                    var isClone = cloneDetector.detectClone(method.tokenFrequencyMap, candidate.tokenFrequencyMap, threashold);
                    if (isClone) {
                        var type = "Type-3";
                        if (util.isEqualArrays(method.tokenParametricArray, candidate.tokenParametricArray)) {
                            type = "Type-2";
                        }
                        if (method.tokenHashValue === candidate.tokenHashValue) {
                            type = "Type-1";
                        }
                        clonePairs.push({'first': method, 'second': candidate, 'type': type});
                    }
                }

            }
        });
    });

    var endTimeForCloneDetecting = new Date();
    console.log("Clone Detection has ended at =: " +endTimeForCloneDetecting);
    console.log("Total time is required to detect clones =: "+((endTimeForCloneDetecting.getTime() - startTimeForCloneDetecting.getTime()) / 1000));
    //console.log("Total number of clones detected := "+clonePair.length);
    return clonePairs;
}


function writeClonePairs(clonePairs,outputClonePath)
{
    var clone="";
    clonePairs.forEach(function (pair) {
        
            clone += pair.first.methodID + '\n' + pair.second.methodID +'\n'+ pair.type+'\n' +
                pair.first.fileName + "," + pair.first.startLine + "," + pair.first.endLine + '\n' +
                pair.second.fileName + "," + pair.second.startLine + "," + pair.second.endLine + '\n' +
                pair.first.methodCode + '\n' + pair.second.methodCode
                + '\n' + "----------------------------------------------------------------------" + '\n';
            
        });
    fs.appendFileSync(outputClonePath, clone);
}




