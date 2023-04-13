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
    require("./models/Postagem")
    const Postagem = mongoose.model("postagens")
    require("./models/Categoria")
    const Categoria = mongoose.model("categorias")
    const usuarios = require("./routes/usuario")

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
        Postagem.find().lean().populate("categoria").sort({date: "desc"}).then((postagens)=>{
            res.render("./cliente/index", {postagens: postagens})
        }).catch((erro)=>{
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/404")
        })
  
    })

    app.get("/categorias",(req,res)=>{
        Categoria.find().lean().then((categorias)=>{
            res.render("./categorias/index", {categorias: categorias})
        }).catch((erro)=>{
            req.flash("error_msg", "Houve um erro interno ao renderizar categorias")
            res.redirect("/")
        })
    })

    app.get("/categorias/:slug", (req,res)=>{
        Categoria.findOne({slug: req.params.slug}).lean().then((categoria)=>{
            if(categoria){
                Postagem.find({categoria: categoria._id}).lean().then((postagens)=>{

                    res.render("./categorias/postagens", {postagens: postagens, categoria: categoria})

                }).catch((erro)=>{
                    req.flash("error_msg", "Houve um erro ao listar os posts")
                    res.redirect("/")
                })
                
            }else{
                req.flash("error_msg", "Essa categoria nao existe")
                res.redirect('/')
            }
        }).catch((erro)=>{
            req.flash("error_msg", 'Houve um erro interno')
        })
    })

    app.get("/postagem/:slug", (req,res)=>{
        Postagem.findOne({slug: req.params.slug}).lean().then((postagem)=>{
            if(postagem){
                res.render("./postagem/index", {postagem: postagem})
            }else{
                req.flash("error_msg", "Essa postagem nao existe")
                res.redirect('/')
            }
        }).catch((erro)=>{
            req.flash("error_msg", 'Houve um erro interno')
        })
    })

    app.get("/404", (req,res)=>{
        res.send("Erro 404!")
    })

    app.get('/posts', (req,res) => {
    res.send("Pagina de posts")
    })

    app.get('/categorias', (req,res) => {
        res.send("Pagina de categorias")
    })
    app.use('/admin', admin)
    app.use("/usuarios", usuarios)


// Outros
const PORT = 8082
app.listen(PORT, () => {
    console.log("Servidor rodando!")
})