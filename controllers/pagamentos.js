module.exports = function(app) {
    app.get('/pagamentos', function(req, res) {
        console.log('/pagamentos: Requisição recebida');
        res.send('OK');
    });

    app.put('/pagamentos/pagamento/:id', function(req, res) {
        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        var id = req.params.id;
        var pagamento = {};
        pagamento.id = id;
        pagamento.status = 'CONFIRMADO';

        console.log(pagamento);

        pagamentoDao.atualiza(pagamento, function(erro) {
            if (erro) {
                console.log("Erro: " + erro);
                res.status(500).res(erro);
            }
            else {
                res.location('/pagamentos/pagamento/' + pagamento.id);
                res.status(201).send(pagamento);
            }
        });
    });

    app.post('/pagamentos/pagamento', function(req, res) {
        
        req.assert("forma_de_pagamento", "Forma de pagamento é obrigatório").notEmpty();
        req.assert("valor", "Valor obrigatório e em decimal.").notEmpty().isFloat();
        req.assert("moeda", "A moeda precisa possuir 3 caracteres.").notEmpty().len(3,3);

        var errors = req.validationErrors();

        if (errors) {
            console.log("Erros de validação encontrados.");
            res.status(400).send(errors);
            return;
        }

        console.log('Processando uma requisição de novo pagamento.');

        var pagamento = req.body;
        pagamento.status = 'CRIADO';
        pagamento.data = new Date;

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.salva(pagamento, function(erro, resultado) {
            if (erro) {
                console.log('Erro ao inserir no BD: ' + erro);
                res.status(500).send(erro);
            }
            else {
                console.log('Pagamento criado');
                res.location('/pagamentos/pagamento/' + resultado.insertId);
                res.status(201).json(pagamento);
            }
        });
    });
}
