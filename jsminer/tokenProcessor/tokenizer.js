module.exports.createToken = createToken;
module.exports.getTokenList=getTokenList;
module.exports.getTokenFrquency=getTokenFrquency;



function createToken(tokenMap) {
    var token = "";
    tokenMap.forEach(function (value, key, map) {
        token += key + "@@::@@" + value + ",";
    });
    return token.slice(0, token.length - 9);

}
function getTokenFrquency(tokenList) {
    var map = new Map();
    tokenList.forEach(function (element) {
        var occurrences = getFrequency(tokenList, element);
        map.set(element, occurrences);
    });

    return map;
}
function getFrequency(tokenList, token) {
    var count = 0;
    tokenList.forEach(function (element) {
        if (element === token) count++;
    });

    return count;
}
function getTokenList(inputString) {
    inputString = removeComments(inputString);
    inputString = replacePatter1(inputString);
    inputString = handleOps(inputString);
    inputString = handleNoiseCharacters(inputString);
    var tokens = tokenize(inputString);
    var strippedTokenList = stripTokens(tokens);
    return strippedTokenList;
}
function strip(str) {
    var x = replaceAll(str, "('|\"|\\\\|:)", "");
    return x;
}
function stripTokens(tokens) {
    var retTokens = new Array();
    tokens.forEach(function (element) {
        retTokens.push(strip(element));
    });
    return retTokens;
}
function handleOps(input) {
    input = handleSimpleAssignmentOperator(input);
    input = handleArithmeticOperator(input);
    input = handleUnaryOperator(input);
    input = handleConditionalOperator(input);
    input = handleBitwiseOperator(input);
    return input;
}
function tokenize(input) {
    var regex = "\\s+";
    var tokens = input.split(new RegExp(regex, 'g'));
    return tokens;
}
function removeComments(input) {
    var regexLineComment = "//.*(\\n|\\r|\\r\\n)";

    var x = replaceAll(input, regexLineComment, " ");
    x = replaceAll(x, "\\n|\\r|\\r\\n", " ");
    var regexPattern = "/\\*.*\\*/";

    x = replaceAll(x, regexPattern, "");
    return x;
}
function replacePatter1(input) {
    var regexPattern = ",|\\(|\\)|\\{|\\}|\\[|\\]|<|>";

    var x = replaceAll(input, regexPattern, " ");
    return x;
}
function handleSimpleAssignmentOperator(input) {
    var regexPattern = "=|\\.";
    var x = replaceAll(input, regexPattern, " ");
    return x;
}
function handleArithmeticOperator(input) {
    var regexPattern = "\\+|-|\\*|/|%";
    var x = replaceAll(input, regexPattern, " ");
    return x;
}
function handleUnaryOperator(input) {
    var regexPattern = "!";
    var x = replaceAll(input, regexPattern, " ");
    return x;
}
function handleConditionalOperator(input) {
    var regexPattern = "\\?";
    var x = replaceAll(input, regexPattern, " ");
    return x;
}
function handleBitwiseOperator(input) {
    var regexPattern = "&|\\^|\\|";
    var x = replaceAll(input, regexPattern, " ");
    return x;
}
function handleNoiseCharacters(input) {
    var regexPattern = ";|@@::@@|@#@";
    var x = replaceAll(input, regexPattern, "");
    return x;
}
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}