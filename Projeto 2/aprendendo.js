
const mongoose = require("mongoose")
const { INTEGER } = require("sequelize")

//Config mongoose
    mongoose.Promise = global.Promise
    mongoose.connect("mongodb://127.0.0.1:27017/aprendendo", {
    useNewUrlParser: true
    }).then(function(){
    console.log("Conectado com sucesso")
    }).catch(function(erro){
    console.log("Erro na conexao" +erro)
    })

// Model - Usuarios

    const UsuarioSchema = mongoose.Schema({

        nome: {
            type: String, require: true
        },
        sobrenome: {
            type: String, require: true
        },
        email: {
            type:String, require: true
        },
        idade: {
            type: Number, require: true
        },
        pais: {
            type: String
        }

    })

    mongoose.model('usuarios', UsuarioSchema)

   const Victor = mongoose.model("usuarios")

   new Victor({
        nome: "Victor",
        sobrenome: "Friche",
        idade: 19,
        email: "vicfriche@gmail.com",
        pais: "Brasil"
   }).save().then(()=>{
    console.log("Usuario cadastrado")
   }).catch((erro) => {
    console.log("Erro ao cadastrar usuario" +erro)
   })