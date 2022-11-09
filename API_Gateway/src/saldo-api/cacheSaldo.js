const commands = require('../models/commands')

var cacheSaldo = []

async function startCache() {
    const [...start] = await commands.Cliente.find()
    return cacheSaldo.push(start)
}

async function atualizarCache() {
   [...cacheSaldo] = await commands.Cliente.find()
   console.log(cacheSaldo)
}

// start do cache
startCache()
    .then(() => console.log('cache iniciado', cacheSaldo))
    .catch(console.log)

async function getCacheSaldo() {
    return cacheSaldo
}

// sincroniza bancoMongoDB com Cache a cada 30 segundos
setInterval(()=>{
    setTimeout(async()=> {
        let i = 0
        var [...cache] = await commands.Cliente.find()
        var [...cacheSaldo] = [cache]
        console.log(cacheSaldo, `cache sincronizado as ${Date()}`)
        return cacheSaldo     
}, 15000)
}, 15000)



getCacheSaldo()

module.exports = {getCacheSaldo, cacheSaldo, atualizarCache}