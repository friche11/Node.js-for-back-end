// Carregando módulos
   const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const app = express()
    const admin = require('./routes/admin')
    const path = require('path')
    const mongoose = require('mongoose')
    const session = require("express-session")
    const flash = require("connect-flash")

// Configurações
    // Sessao
        app.use(session({
            secret: "cursodenode",
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())
    // Middleware
        app.use((req,res,next) =>{
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            next()
        })
    // Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    // Handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars');
    // Public
        app.use(express.static(path.join(__dirname + "/public")))
    // Mongoose
        mongoose.Promise = global.Promise
        mongoose.connect("mongodb://127.0.0.1:27017/blogapp", {
        useNewUrlParser: true
        }).then(function(){
        console.log("Conectado com sucesso")
        }).catch(function(erro){
        console.log("Erro na conexao" +erro)
        })
// Rotas
    app.get('/', (req,res) => {
    res.send("Pagina principal")
    })

    app.get('/posts', (req,res) => {
    res.send("Pagina de posts")
    })

    app.get('/categorias', (req,res) => {
        res.send("Pagina de categorias")
    })
    app.use('/admin', admin)


// Outros
const PORT = 8082
app.listen(PORT, () => {
    console.log("Servidor rodando!")
})