// Carregando módulos
   const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const app = express()
    const admin = require('./routes/admin')
    const path = require('path')
    const mongoose = require('mongoose')

// Configurações
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