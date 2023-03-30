const express = require("express"); //Importa o pacote Express para utilizar as funcoes e recursos do Express

const app = express(); //Funcao cria uma instancia do framework Express pra variavel app.

app.get("/", function(req, res){
    res.send("Seja bem-vindo ao meu app!")
});  //Criacao da rota principal da aplicacao





app.listen(8081, function(){
    console.log("Servidor rodando na url http://localhost:8081")
});  //Tem que ser a ultima linha do codigo para que tudo funcione dentro do servidor.


