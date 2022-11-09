const config = require('../../../configServidor.json')
const express = require('express')
const app = express()
var logger = require('morgan')

// configurações da api
app.use(express.urlencoded
    ({extended: true}))
app.use(express.json())
app.use(logger('dev'))

// rotas da api de transacao
const transacaoRoutes = require('./routes/transacaoRoutes')
app.use('/', transacaoRoutes.router)


app.listen(config.PortaAPITransacao, ()=> {
    console.log(`API de Transacao iniciado na porta ${config.PortaAPITransacao}`)
    })
    
