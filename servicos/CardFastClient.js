const restify = require('restify-clients');

function CardFastClient() {
    this._client = restify.createJsonClient({
        url: 'http://localhost:3002',
        version: '~1.0'
    });
}

CardFastClient.prototype.autoriza = function(cartao, callback) {
    this._client.post('/cartoes/autoriza', cartao, callback);
}

module.exports = function() {
    return CardFastClient;
};
