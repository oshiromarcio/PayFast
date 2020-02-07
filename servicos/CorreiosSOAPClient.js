const soap = require('soap');

function CorreiosSOAPClient() {
    this._url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl';
}

CorreiosSOAPClient.prototype.calculaPrazo = function(args, callback) {
    soap.createClient(this._url, function(erro, cliente) {
        console.log("Client SOAP criado");
        cliente.CalcPrazo(args, callback);
    });
};
/*
soap.createClient('http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl',
    function(erro, cliente) {
        console.log("Cliente SOAP criado");

        cliente.CalcPrazo({ 'nCdServico':'40010',
                            'sCepOrigem':'04101300',
                            'sCepDestino':'6500600' },
            function(err, result) {
                console.log(JSON.stringify(result));
            });
    });
*/
module.exports = function() {
    return CorreiosSOAPClient;
}
