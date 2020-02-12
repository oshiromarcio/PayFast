const fs = require('fs');
const path = require('path');
const arquivo = process.argv[2];
const filename = path.basename(arquivo);

fs.createReadStream(arquivo)
    .pipe(fs.createWriteStream('novo_' + filename))
    .on('finish', function() {
        console.log('Arquivo com stream criado');
    });
