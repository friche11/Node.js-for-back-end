const Sequelize = require('sequelize')
const sequelize = new Sequelize('cursonodejs', 'root', 'Ca008900', {
    host: "localhost",
    dialect: 'mysql'
})

sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso")
}).catch(function(erro){
        console.log("Falha ao se conectar: "+erro)
})

const Postagem = sequelize.define('postagens', {
    titulo:{
        type: Sequelize.STRING  //Caracteres limitados
    },
    conteudo:{
        type: Sequelize.TEXT   //Caracteres ilimitados
    }
})  //Criar modulo de postagem


Postagem.create({
    titulo: "Titulo qualquer",
    conteudo: "sauhhuashusahusahuusahu"
})


const Usuario = sequelize.define('usuarios',{
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
})

//Usuario.sync({force:true})

//Postagem.sync({
 //   force:true     //gerar a tabela do objeto postagem no banco de dados
//})
