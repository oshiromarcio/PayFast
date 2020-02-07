const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

module.exports = function() {
    const app = express();
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(expressValidator());

    consign()
        .include('controllers')
        .then('persistencia')
        .then('servicos')
        .into(app);
    // O comando acima é a mesma coisa que fazer o comando abaixo
    //const pagamentos = require('../controllers/pagamentos.js');
    //pagamentos(app);

    return app;
}
