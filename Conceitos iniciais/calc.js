var somaFunc = require("./Modulos/soma");  //Variavel somaFunc recebe o modulo de soma. Para pegar um module sempre use a funcao require()
var subFunc = require("./Modulos/sub");
var multiFunc = require("./Modulos/multi");
var divFunc = require("./Modulos/div");

console.log(somaFunc(1,2));
console.log(subFunc(1,2));
console.log(multiFunc(10,10));
console.log(divFunc(10,5));