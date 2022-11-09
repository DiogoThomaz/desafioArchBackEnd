// importando bibliotecas e módulos
const express = require('express')
const config = require('./configServidor.json')
const httpProxy = require('express-http-proxy')
var logger = require('morgan')



// configurações do gateway
const app = express()
app.use(express.urlencoded
    ({extended: true}))
app.use(express.json())
app.use(logger('dev'))


// resposta teste
app.get('/', (req, res) => {
    return res.json({message: "Gateway funcionando"})
})

// rotas
app.use('/saldo', httpProxy(`http://localhost:${config.PortaAPISaldo}/`, {timeout: config.timeout}))
app.use('/transacao', httpProxy(`http://localhost:${config.PortaAPITransacao}/`, {timeout: config.timeout}))


// start do gateway
app.listen(config.PortaGateway, ()=> {
    console.log(`Gateway iniciado na porta ${config.PortaGateway}`)
})


