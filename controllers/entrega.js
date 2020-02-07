module.exports = function(app) {

    app.post('/entrega/calcula-prazo', function(req, res) {
        var dadosEntrega = req.body;

        var correiosSOAPClient = new app.servicos.CorreiosSOAPClient();
        correiosSOAPClient.calculaPrazo(dadosEntrega, function(err, result) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
                return;
            }
            else {
                var resultJSON = JSON.stringify(result);
                console.log(resultJSON);
                res.status(201).send(resultJSON);
            }
        })
    });
}