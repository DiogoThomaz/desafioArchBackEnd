const config = require('../../../configServidor.json')
const express = require('express')
const app = express()
var logger = require('morgan')

app.use(express.urlencoded
    ({extended: true}))
app.use(express.json())
app.use(logger('dev'))


// rotas da API
const saldoRoutes = require('./routes/saldoRoutes')
app.get('/', saldoRoutes.router)


// iniciando api
app.listen(config.PortaAPISaldo, ()=> {
    console.log(`API de Saldo iniciado na porta ${config.PortaAPISaldo}`)})
