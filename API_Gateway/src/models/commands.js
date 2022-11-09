const mongoose = require('mongoose')
const configDataBase = require('../../../configBancoDeDados.json')

mongoose
    .connect(configDataBase.mongoDB)
    .then(() => console.log('conexão com o servidor feita'))
    .catch(console.log)

var Cliente = mongoose.model('clientes', {
    nome: String,
    saldo: Number,
    transacao: Number
})



module.exports={Cliente}