function PagamentoDao(connection) {
    this._connection = connection;
}

PagamentoDao.prototype.salva = function(pagamento, callback) {
    this._connection.query('INSERT INTO pagamentos SET ?', pagamento, callback);
}

PagamentoDao.prototype.atualiza = function(pagamento, callback) {
    this._connection.query('UPDATE pagamentos SET status = ? WHERE id = ?', [pagamento.status, pagamento.id], callback);
}
/*
Pagamento.prototype.lista = function(ret, function()() {
    this._connection.query('SELECT * FROM pagamentos', function(error, results, fields){
        if(error) 
            ret.json(error);
        else
            ret.json(results);
        this._connection.end();
        console.log('executou!');
    });
    console.log(ret);
})
*/
PagamentoDao.prototype.buscaPorId = function(id, callback) {
    return this._connection.query('SELECT * FROM pagamentos WHERE id = ?', [id], callback);
}

module.exports = function() {
    return PagamentoDao;
};
