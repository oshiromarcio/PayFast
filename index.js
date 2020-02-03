const CustomExpress = require('./config/custom-express');
const app = CustomExpress();

app.listen(3001, function() {
    console.log("Servidor rodando na porta 3001");
});

app.get('/pagamentos', function(req, res) {
    console.log('/pagamentos: Requisição recebida');
    res.send('OK');
});