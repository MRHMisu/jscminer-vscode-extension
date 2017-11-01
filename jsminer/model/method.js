module.exports.Method=Method;

function Method(fileID, fileName, filePath) {
    this.fileID = fileID;
    this.fileName = fileName;
    this.filePath = filePath;
    this.methodID = 0;;
    this.methodLength=0;

    this.methodCode=null;
    this.tokenFrequencyMap=null;
    this.tokenArray=null;
    this.tokenParametricArray=null;
    this.tokenStirngInLine=null;
    this.tokenHashValue=null;

    this.setMethodID = function (methodID) {
        this.methodID = methodID;
    };
    this.setMethodName = function (methodName) {
        this.methodName = methodName;
    };
    this.setStartLine = function (startLine) {
        this.startLine = startLine;
    };
    this.setEndLine = function (endLine) {
        this.endLine = endLine;
    };
    this.setMethodCode = function (methodCode) {
        this.methodCode = methodCode;
    };
    this.setMethodLength = function (methodLength) {
        this.methodLength = methodLength;
    };

    this.setTokenFrequencyMap = function (tokenFrequencyMap) {
        this.tokenFrequencyMap = tokenFrequencyMap;
    };

    this.setTokenArray=function (tokenArray) {
        this.tokenArray = tokenArray;
    };

    this.setTokenStringInLine=function (tokenStringInLine) {
        this.tokenStringInLine = tokenStringInLine;
    };
    this.setTokenHashValue=function (tokenHashValue) {
        this.tokenHashValue = tokenHashValue;
    };
    this.setTokenParametricArray=function (tokenParametricArray) {
        this.tokenParametricArray = tokenParametricArray;
    };

}