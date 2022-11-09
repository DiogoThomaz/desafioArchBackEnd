
/*

Função que tenta realizar as transações
exportar arquivo para a rota

*/
function retryTransacao(nome = 'cliente', saldo = 0, transacao = 0, tentativas = 3, espera = 30) {
    try {
        saldo = saldo + transacao
        let resposta = {
        nome: `${nome}`,
        novoSaldo: `${saldo}`,
        transacao: `${transacao}`}
        return resposta    
    } 
    catch (error) {
        console.log(error)    
    }
    
}

module.exports = {retryTransacao}


