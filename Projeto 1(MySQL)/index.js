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
        res.redirect('/')
    }).catch(function(){
        res.send("Houve um erro: " +erro)
    })
       
    })

    app.get('/', function(req, res){
        Post.findAll({order: [['id', 'ASC']]}).then(function(posts){
            res.render('home.handlebars', {posts: posts})
        })
        
    })

    app.get('/deletar/:id', function(req, res){
        Post.destroy({where: {'id': req.params.id}}).then(function(){
            res.send("Postagem deletada com sucesso")
        }).catch(function(erro){
            res.send("Essa postagem nao existe")
        })
    })




app.listen(8081, function(){
    console.log("Servidor rodando na url http://localhost:8081")
});  //Tem que ser a ultima linha do codigo para que tudo funcione dentro do servidor.


