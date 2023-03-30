const express = require("express"); //Importa o pacote Express para utilizar as funcoes e recursos do Express

const app = express(); //Funcao cria uma instancia do framework Express pra variavel app.

app.get("/", function(req, res){
    res.send("Seja bem-vindo ao meu app!")
})  //Criacao da rota principal da aplicacao

app.get("/sobre", function(req, res){
    res.send("Minha pagina sobre")
})

app.get("/blog", function(req, res){
    res.send("Bem-vindo ao meu blog")
})

app.get("/ola/:nome/:cargo", function(req, res){
    res.send("<h1>Ola "  +req.params.nome +"</h1>" + 
    "<h2>Seu cargo e "  +req.params.cargo +"</h2>")  

})  //Rota com parametro "nome" e "cargo"



app.listen(8081, function(){
    console.log("Servidor rodando na url http://localhost:8081")
});  //Tem que ser a ultima linha do codigo para que tudo funcione dentro do servidor.


