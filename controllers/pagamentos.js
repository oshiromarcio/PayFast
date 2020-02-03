module.exports = function(app) {
    app.get('/pagamentos', function(req, res) {
        console.log('/pagamentos: Requisição recebida');
        res.send('OK');
    });
}
