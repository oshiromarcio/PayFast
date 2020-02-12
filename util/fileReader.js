var fs = require('fs');
var path = require('path');

var arquivo = process.argv[2];

fs.readFile(arquivo, function(error, buffer) {
    if (error) {
        console.log('Erro na leitura do arquivo: ');
        console.log(error);
        return;
    }
    console.log('Arquivo lido: ' + path.basename(arquivo));
    fs.writeFile(path.basename(arquivo), buffer, function(err) {
        if (err) {
            console.log('Erro na escrita do arquivo: ');
            console.log(err);
            return;
        }
        console.log('Arquivo escrito');
    });
});