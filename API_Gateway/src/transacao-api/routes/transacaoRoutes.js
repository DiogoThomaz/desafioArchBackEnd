const router = require('express').Router()
var { Mongoose } = require('mongoose')
var commands = require('../../models/commands')
var cache = require('../../saldo-api/cacheSaldo')
 




// saldo recarga
 router.get('/', async (req, res) => {
     var {nome, transacao, consulta} = req.body
     

     try {

        // recebendo dados de cache em memoria do cliente (Query cache em memoria)
         var consultaCacheDeTransacao = await (cache.cacheSaldo[0]
            .filter(a => a.nome == nome)
            .map(b => b))
         var idDoCliente = consultaCacheDeTransacao[0]._id   
         var nomeDoCliente = consultaCacheDeTransacao[0].nome   
         var saldoDoCliente = consultaCacheDeTransacao[0].saldo
         var novoSaldo = parseInt(saldoDoCliente) + parseInt(transacao)
         var approvedStatus = true
         var cliente = {
            nomeDoCliente,
            novoSaldo,
            transacao
         }
            // inserindo novo saldo no banco de dadosMongoDB
         await commands.Cliente.findOneAndUpdate({_id: idDoCliente}, {saldo: novoSaldo})
            .then(() => cache.atualizarCache())
            .catch(console.log)
         res.status(201).json({msg: 'alteracao feita com sucesso', res: cliente})
         
     } catch (error) {
         res.status(500).json({error: `erro na rota${erro}`})
     }
 })

module.exports = {router}