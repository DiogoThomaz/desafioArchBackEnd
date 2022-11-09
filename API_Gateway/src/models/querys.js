const mongoose = require('mongoose')
const configDataBase = require('../../../configBancoDeDados.json')

mongoose
    .connect(configDataBase.mongoDB)
    .then(() => console.log('conexão com o servidor feita'))
    .catch(console.log)


function getSaldo(nome) {
    const querySaldo = mongoose.model('pessoas').findOne({'nome':`${nome}`})
    return querySaldo
}


module.exports = {getSaldo}