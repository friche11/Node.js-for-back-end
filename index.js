const express = require("express"); //Importa o pacote Express para utilizar as funcoes e recursos do Express

const app = express(); //Funcao cria uma instancia do framework Express pra variavel app.

const handlebars = require('express-handlebars')


// Config
    // Template Engine
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
        
    //Conexao com banco de dados
    const Sequelize = require('sequelize')
    const sequelize = new Sequelize('cursonodejs', 'root', 'Ca008900', {
    host: "localhost",
    dialect: 'mysql'
    })





app.listen(8081, function(){
    console.log("Servidor rodando na url http://localhost:8081")
});  //Tem que ser a ultima linha do codigo para que tudo funcione dentro do servidor.


