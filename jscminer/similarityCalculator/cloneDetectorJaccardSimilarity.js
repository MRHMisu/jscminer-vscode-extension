function getJaccardSimilarity(mapOne, mapTwo) {
    var mapOneKeysSet = new Set();
    var mapTwoKeysSet = new Set();

    mapOne.forEach(function (value, key, map) {
        mapOneKeysSet.add(key);
    });

    mapTwo.forEach(function (value, key, map) {
        mapTwoKeysSet.add(key);
    });

    var intersection = intersection(mapOneKeysSet, mapTwoKeysSet);
    var union = union(mapOneKeysSet, mapTwoKeysSet);
    var jaccardSimilarity=Math.round((intersection.size/union.size)*100)/100;
    return jaccardSimilarity;

}


function union(setA, setB) {
    var union = new Set(setA);
    setB.forEach(function (element) {
        union.add(element);
    });
    return union;
}

function intersection(setA, setB) {
    var intersection = new Set();
    setB.forEach(function (element) {
        if (setA.has(element)) {
            intersection.add(element);
        }
    });
    return intersection;
}


function difference(setA, setB) {
    var difference = new Set(setA);
    setB.forEach(function (element) {
        difference.delete(element);
    });
    return difference;
}

