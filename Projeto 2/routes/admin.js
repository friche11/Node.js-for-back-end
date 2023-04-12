const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

// Carregar models
require("../models/Categoria")
const Categoria = mongoose.model("categorias")
require("../models/Postagem")
const Postagem = mongoose.model("postagens")

// Rotas
router.get('/', (req,res) => {
    res.render("./admin/index")
})

router.get('/posts', (req,res) => {
    res.send("Pagina de posts")
})

router.get('/categorias', (req,res) => {
    Categoria.find().sort({date:'desc'}).lean().then((categorias) =>{
        res.render("./admin/categorias", {categorias: categorias})
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao listar as categorias")
        res.redirect("/admin")
    })
})

router.get("/postagens", (req,res)=>{
    Postagem.find().lean().populate("categoria").sort({date:"desc"}).then((postagens)=>{
        res.render("./admin/postagens", {postagens: postagens})
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao listar postagens")
        res.redirect("/admin")
    })

})

router.get('/categorias/add', (req, res)=>{
    res.render("./admin/addcategoria")
})

router.get('/postagens/add', (req, res)=>{
    Categoria.find().lean().then((categorias)=>{
        res.render("./admin/addpostagem", {categorias: categorias})
    }).catch((erro)=>{
        req.flash("error_msg", "Houve um erro ao carregar formulario")
        res.redirect("/admin")
    })

    
  
})

router.get('/categorias/edit/:id', (req, res)=>{
    Categoria.findOne({_id:req.params.id}).lean().then((categoria)=>{
        res.render("./admin/editcategoria", {categoria: categoria})
    }).catch((erro)=>{
        req.flash("error_msg", "Essa categoria nao existe")
        res.redirect("/admin/categorias")
    })
    
})

router.post("/categorias/edit", (req,res)=>{
    Categoria.findOne({_id: req.body.id}).then((categoria)=>{

        var erros = []
        if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
            erros.push({texto: "Nome invalido"})
        }
    
        if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
            erros.push({texto: "Slug invalido"})
        }
    
        if(req.body.nome.length < 2){
            erros.push({texto: "Nome da categoria muito pequeno"})
        }
    
        if(erros.length > 0){
            res.render("./admin/addcategoria", {erros: erros})
        }else{
        categoria.nome = req.body.nome
        categoria.slug = req.body.slug

        categoria.save().then(()=>{
            req.flash("success_msg", "Categoria editada com sucesso")
            res.redirect("/admin/categorias")
        }).catch((erro)=>{
            req.flash("error_msg", "Erro interno ao salvar a edicao")
        })
    }

    }).catch((erro)=>{
        req.flash("error_msg", "Erro ao editar categoria")
        res.redirect("/admin/categorias")
    })
})

router.post('/categorias/nova', (req,res) => {
    // Validacao de formulario
    var erros = []
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome invalido"})
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: "Slug invalido"})
    }

    if(req.body.nome.length < 2){
        erros.push({texto: "Nome da categoria muito pequeno"})
    }

    if(erros.length > 0){
        res.render("./admin/addcategoria", {erros: erros})
    }else{

        const novaCategoria ={
            nome: req.body.nome,
            slug: req.body.slug
        }
        new Categoria(novaCategoria).save().then(() =>{
            req.flash("success_msg", "Categoria criada com sucesso")
            res.redirect("/admin/categorias")
        }).catch((erro) =>  {
            req.flash("error_msg", "Erro ao salvar categoria")
            res.redirect("/admin")
        })

    }

})

router.post("/categorias/deletar", (req,res)=>{
    Categoria.deleteOne({_id: req.body.id}).then(()=>{
        req.flash("success_msg", "Categoria deletada com sucesso")
        res.redirect("/admin/categorias")
    }).catch((erro)=>{
        req.flash("error_msg", "Houve um erro ao deletar a categoria")
        res.redirect("/admin/categorias")
    })
})

router.post("/postagens/nova", (req,res) => {
    var erros = []
    if(req.body.categoria == '0'){
        erros.push({texto: "Categoria invalida, registre uma categoria"})
    }

    if(erros.length > 0){
        res.render("admin/addpostagem", {erros: erros})
    }else{
        const novaPostagem ={
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria,
            slug: req.body.slug
        }

        new Postagem(novaPostagem).save().then(()=>{
            req.flash("success_msg", "Postagem criada com sucesso")
            res.redirect("/admin/postagens")
        }).catch((erro)=>{
            req.flash("error_msg", "Houve um erro durante a criacao de uma nova postagem")
            res.redirect("/admin/postagens")
        })
    }

})

module.exports = router