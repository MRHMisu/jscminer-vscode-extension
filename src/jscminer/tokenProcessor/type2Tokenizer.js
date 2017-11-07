module.exports.getParametricTokenize=getParametricTokenize;
module.exports.getParametricPlusIdentifiersTokenize=getParametricPlusIdentifiersTokenize;
module.exports.getFullTypeTwoTokenizer=getFullTypeTwoTokenizer;

var esprima = require('esprima');

function getParametricTokenize(code) {
    var tokenObjectArray = getNormalToken(code);
    var tokenCopied = getCopiedToken(tokenObjectArray);
    var setArray = getUniqueIdentifiersFromTokenObjectArray(tokenObjectArray);
    setArray.forEach(function (setElement, setIndex, set) {
        tokenObjectArray.forEach(function (element, index, array) {
            if (element.type === 'Identifier' && element.value === setElement) {
                tokenCopied[index].value = "X" + setIndex;
            }

        });
    });
    return tokenCopied;
}
function getParametricPlusIdentifiersTokenize(code) {
    var tokenObjectArray = getNormalToken(code);
    var tokenCopied = getCopiedToken(tokenObjectArray);
    var setArray = getUniqueIdentifiersFromTokenObjectArray(tokenObjectArray);
    setArray.forEach(function (setElement, setIndex, set) {
        tokenObjectArray.forEach(function (element, index, array) {
            if (element.type === 'Identifier' && element.value === setElement) {
                tokenCopied[index].value = "X" + setIndex;
            }
            if (element.type === 'Numeric' || element.type === 'Boolean' || element.type === 'String') {
                tokenCopied[index].value = "literal";
            }

        });
    });
    return tokenCopied;

}
function getFullTypeTwoTokenizer(code) {
    var tokenObjectArray = getNormalToken(code);
    var tokenCopied = getCopiedToken(tokenObjectArray);
    var setArray = getUniqueIdentifiersFromTokenObjectArray(tokenObjectArray);
    setArray.forEach(function (setElement, setIndex, set) {
        tokenObjectArray.forEach(function (element, index, array) {
            if (element.type === 'Identifier' && element.value === setElement) {
                tokenCopied[index].value = "X";
            }
            if (element.type === 'Numeric' || element.type === 'Boolean' || element.type === 'String') {
                tokenCopied[index].value = "literal";
            }

        });
    });
    return tokenCopied;

}
function getNormalToken(code) {
    var token = esprima.tokenize(code);
    return token;
}
function getCopiedToken(tokenArray) {
    var tokenCopied = new Array();
    tokenArray.forEach(function (element) {
        tokenCopied.push(element);
    });
    return tokenCopied;

}
function getUniqueIdentifiersFromTokenObjectArray(tokenObjectArray) {
    var uniqueIdentifiersValues = new Set();
    tokenObjectArray.forEach(function (element) {
        if (element.type === 'Identifier') {
            uniqueIdentifiersValues.add(element.value);
        }
    });
    var setArray = new Array();
    uniqueIdentifiersValues.forEach(function (element) {
        setArray.push(element);
    });
    return setArray;
}


