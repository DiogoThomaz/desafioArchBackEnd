const router = require('express').Router()
const { Mongoose } = require('mongoose')
const commands = require('../../models/commands')
const cache = require('../cacheSaldo')
 

// retorna o saldo


// saldo recarga
 router.get('/', async (req, res) => {
     const {nome, transacao, consulta} = req.body
     

     try {

        // recebendo dados de cache em memoria do cliente (Query cache em memoria)
         const consultaCacheDeSaldo = await (cache.cacheSaldo[0]
            .filter(a => a.nome == nome)
            .map(b => b))
         const idDoCliente = consultaCacheDeSaldo[0]._id   
         const nomeDoCliente = consultaCacheDeSaldo[0].nome   
         const saldoDoCliente = consultaCacheDeSaldo[0].saldo
         const novoSaldo = parseInt(saldoDoCliente) + parseInt(transacao)
         const approvedStatus = true
         const cliente = {
            nomeDoCliente,
            novoSaldo,
            transacao
         }
         
         // devolve o saldo para o usuário se foi pedido no body
         /* modelo de json que espera-se receber no body:
           {
            "nome": "Gabriela",
            "transacao": null,
            "consulta": true
            }*/
         if(consulta === true) {
            return res.json({saldo: saldoDoCliente})
         }
            // inserindo novo saldo no banco de dados
            await commands.Cliente.findOneAndUpdate({_id: idDoCliente}, {saldo: novoSaldo})
                .then(() => {return cache.getCacheSaldo()})
                .then(() => {return cache.cacheSaldo})
                .catch(console.log)
            res.status(201).json({msg: 'alteracao feita com sucesso', res: cliente})


     } catch (error) {
         res.status(500).json({error: `${error}`})
     }
 })

module.exports = {router}