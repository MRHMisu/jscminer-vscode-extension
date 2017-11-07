module.exports.detectClone = detectClone;


function detectClone(mapOne, mapTwo, threashold) {
    var max = null;
    var min = null;
    if (mapOne.size >= mapTwo.size) {
        max = mapOne;
        min = mapTwo;
    }
    if (mapTwo.size >= mapOne.size) {
        max = mapTwo;
        min = mapOne;
    }
    var computedThreshold = Math.ceil(max.size * threashold);
    var sharedTokens = 0;
    if (min.size < computedThreshold) {
        return false;
    }

    var isCloneDetected = false;
    max.forEach(function (maxTermFrequency, maxKeyTerm, map) {
        if (!isCloneDetected) {
            var minTermFrequency = min.get(maxKeyTerm);
            if (minTermFrequency != null) {
                sharedTokens += Math.min(max.get(maxKeyTerm), min.get(maxKeyTerm));
            }
            if (sharedTokens >= computedThreshold) {
                isCloneDetected = true;
                return true;
            }
        }

    });

    return isCloneDetected;

}
