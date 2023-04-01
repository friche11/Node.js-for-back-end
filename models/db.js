const Sequelize = require('sequelize')

 //Conexao com banco de dados
 const sequelize = new Sequelize('postapp', 'root', 'Ca008900', {
    host: "localhost",
    dialect: 'mysql'
    })

    module.exports = {
        Sequelize: Sequelize,
        sequelize: sequelize
    }