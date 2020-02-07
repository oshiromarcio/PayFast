const PAGAMENTO_CRIADO = 'CRIADO';
const PAGAMENTO_CONFIRMADO = 'CONFIRMADO';
const PAGAMENTO_CANCELADO = 'CANCELADO';

module.exports = function(app) {

    app.get('/pagamentos', function(req, res) {
        res.send('OK');
        /*
        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.lista(function(erro) {
            console.log(erro);
            if (erro) {
                console.log("Erro: " + erro);
                res.status(500).send(erro);
            }
            else {
                res.status(200).send(result);
            }
        });*/
    });

    app.post('/pagamentos/pagamento', function(req, res) {
        
        req.assert("pagamento.forma_de_pagamento", "Forma de pagamento é obrigatório").notEmpty();
        req.assert("pagamento.valor", "Valor obrigatório e em decimal.").notEmpty().isFloat();
        req.assert("pagamento.moeda", "A moeda precisa possuir 3 caracteres.").notEmpty().len(3,3);

        var errors = req.validationErrors();

        if (errors) {
            console.log("Erros de validação encontrados.");
            res.status(400).send(errors);
            return;
        }

        console.log('Processando uma requisição de novo pagamento.');

        var pagamento = req.body["pagamento"];
        if (pagamento.forma_de_pagamento == "cartao_de_credito") {
            var cartaoDeCredito = req.body["cartao_de_credito"];
            var servico = new app.servicos.CardFastClient();
            servico.autoriza(cartaoDeCredito, function(err, request, response, ret) {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                    return;
                }
                else {
                    console.log("Cartão autorizado");
                    console.log(ret);
                    pagamento.status = PAGAMENTO_CRIADO;
                    pagamento.data = new Date;
            
                    var connection = app.persistencia.connectionFactory();
                    var pagamentoDao = new app.persistencia.PagamentoDao(connection);
            
                    pagamentoDao.salva(pagamento, function(erro, resultado) {
                        if (erro) {
                            console.log('Erro ao inserir no BD: ' + erro);
                            res.status(500).send(erro);
                        }
                        else {
                            pagamento.id = resultado.insertId;
                            console.log('Pagamento criado');
                            res.location('/pagamentos/pagamento/' + pagamento.id);
            
                            var response = {
                                dados_do_pagamento: pagamento,
                                cartao: ret,
                                links: [
                                    {
                                        href: "http://localhost:3001/pagamentos/pagamento/" + pagamento.id,
                                        rel: "confirmar",
                                        method: "PUT"
                                    },
                                    {
                                        href: "http://localhost:3001/pagamentos/pagamento/" + pagamento.id,
                                        rel: "cancelar",
                                        method: "DELETE"
                                    }
                                ]
                            };
            
                            res.status(201).json(response);
                        }
                    });
                }
            });
        }
        
    });

    app.put('/pagamentos/pagamento/:id', function(req, res) {
        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        var pagamento = {};
        pagamento.id = req.params.id;
        pagamento.status = PAGAMENTO_CONFIRMADO;

        pagamentoDao.atualiza(pagamento, function(erro) {
            if (erro) {
                console.log("Erro: " + erro);
                res.status(500).res(erro);
            }
            else {
                var response = {
                    dados_do_pagamento: pagamento,
                    links: [
                        {
                            href: "http://localhost:3001/pagamentos/pagamento/" + pagamento.id,
                            rel: "cancelar",
                            method: "DELETE"
                        }
                    ]
                };
                res.location('/pagamentos/pagamento/' + pagamento.id);
                res.status(201).send(response);
            }
        });
    });

    app.delete('/pagamentos/pagamento/:id', function(req, res) {
        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        var pagamento = {};
        pagamento.id = req.params.id;
        pagamento.status = PAGAMENTO_CANCELADO;

        pagamentoDao.atualiza(pagamento, function(erro) {
            if (erro) {
                console.log("Erro: " + erro);
                res.status(500).send(erro);
            }
            else {
                res.location('/pagamentos/pagamento/' + pagamento.id);
                res.status(204).send(pagamento);
            }
        });
    });

}
