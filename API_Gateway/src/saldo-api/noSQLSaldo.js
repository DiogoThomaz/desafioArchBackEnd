const mongoose = require('mongoose')
const configDataBase = require('../../../configBancoDeDados.json')

mongoose
    .connect(configDataBase.mongoDB)
    .then(() => console.log('conexão com o banco de dados mongo feita com sucesso!'))
    .catch(console.log)