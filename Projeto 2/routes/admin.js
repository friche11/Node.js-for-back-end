const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")

router.get('/', (req,res) => {
    res.render("./admin/index")
})

router.get('/posts', (req,res) => {
    res.send("Pagina de posts")
})

router.get('/categorias', (req,res) => {
    Categoria.find().sort({date:'desc'}).lean().then((categorias) =>{
        res.render("admin/categorias", {categorias: categorias})
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao listar as categorias")
        res.redirect("/admin")
    })
})

router.get('/categorias/add', (req, res)=>{
    res.render("./admin/addcategoria")
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

module.exports = router