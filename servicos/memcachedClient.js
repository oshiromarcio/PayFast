/*
var memcached = require('memcached');
memcached.config.maxKeySize = 250;

var cliente = memcached('localhost:11211', {
    maxKeySize: 250,
    retries: 10,
    retry: 10000,
    remove: true
});

cliente.get('pagamento-20', function(erro, retorno) {
    if (erro || !retorno) {
        console.log('MISS - chave não encontrada');
    }
    else {
        console.log('HIT - valor: ' + retorno);
    }
});
*/