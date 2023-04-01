const express = require("express"); //Importa o pacote Express para utilizar as funcoes e recursos do Express

const app = express(); //Funcao cria uma instancia do framework Express pra variavel app.

const handlebars = require('express-handlebars');

const Post = require('./models/Post')

// Config
    // Template Engine
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')

    //BodyParser
    app.use(express.urlencoded({extended:false}))
    app.use(express.json())


    //Rotas
    app.get('/cad', function(req, res){
        res.render('formulario.handlebars')
    })

    app.post('/add', function(req, res){
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function(){
        res.send("Post criado com suucesso")
    }).catch(function(){
        res.send("Houve um erro: " +erro)
    })
       
    })




app.listen(8081, function(){
    console.log("Servidor rodando na url http://localhost:8081")
});  //Tem que ser a ultima linha do codigo para que tudo funcione dentro do servidor.


