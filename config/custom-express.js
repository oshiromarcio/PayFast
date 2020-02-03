const express = require('express');
const consign = require('consign');

module.exports = function() {
    const app = express();

    consign()
        .include('controllers')
        .into(app);
    // O comando acima é a mesma coisa que fazer o comando abaixo
    //const pagamentos = require('../controllers/pagamentos.js');
    //pagamentos(app);

    return app;
};
