var tokenizer= require("./tokenizer");
var detector= require("././cloneDetectoOverlapSimilarityr");
var encoder=require("./hasingTokenizer");
var input1 = "0:main:/**      * @param args     \n*/     public static void main(String[] args) {         // TODO Auto-generated method stub \n         Set<Bag> setA = CloneTestHelper.getTestSet(1, 11);         Set<Bag> setB = CloneTestHelper.getTestSet(11, 21);         PrintWriter projectAWriter = null;         PrintWriter projectBWriter = null;         CloneHelper cloneHelper = new CloneHelper();         try {             SourceFile f = new SourceFile(projectA.txt);             if(f.delete()){                 System.out.println(deleted existing projectA.txt);             }             f = new SourceFile(projectB.txt);             if(f.delete()){                 System.out.println(deleted existing projectB.txt);             }             projectAWriter = Util.openFile(projectA.txt);             Util.writeToFile(projectAWriter, cloneHelper.stringify(setA), true);             projectBWriter = Util.openFile(projectB.txt);             Util.writeToFile(projectBWriter, cloneHelper.stringify(setB), true);";
var input2 = "0:main:/**      * @param args     \n*/     public static void main(String[] args) {         // TODO Auto-generated method stub \n         Set<Bag> setA = CloneTestHelper.getTestSet(1, 11);         Set<Bag> setB = CloneTestHelper.getTestSet(11, 21);         PrintWriter projectAWriter = null;         PrintWriter projectBWriter = null;         CloneHelper cloneHelper = new CloneHelper();         try {             SourceFile f = new SourceFile(projectA.txt);             if(f.delete()){                 System.out.println(deleted existing projectA.txt);             }             f = new SourceFile(projectB.txt);             if(f.delete()){                 System.out.println(deleted existing projectB.txt);";

//console.log(input1);
//console.log(input1.trim());


//var k=type1Tokenizer.getTokenSingleInLine(input1);
console.log(k);
var one=encoder.getMD5HashCode(k);
console.log(one);

var program = 'const answer = 42; var a="op"; if(answer==9)a=0';
//getParametricTokenize(program);
//var l=getParametricPlusIdentifiersTokenize(program);
//console.log(l);
var k = getFullTypeTwoTokenizer(program);
console.log(k);
//var mapOne=type1Tokenizer.getTokenFrequencyMap(input1);

//var mapTwo=type1Tokenizer.getTokenFrequencyMap(input2);
//var threashold=0.8;
//var result=detector.detectClone(mapOne,mapTwo,threashold);
//console.log(mapOne);


//console.log(type1Tokenizer.createToken(mapOne));
