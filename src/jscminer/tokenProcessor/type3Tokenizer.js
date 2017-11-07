module.exports.getTokenFrequencyMap = getTokenFrequencyMap;

var tokenizer=require('./tokenizer');

function getTokenFrequencyMap(tokenString) {
    var tokenList = tokenizer.getTokenList(tokenString);
    var tokenFrquencyMap = tokenizer.getTokenFrquency(tokenList);
    return tokenFrquencyMap;
}