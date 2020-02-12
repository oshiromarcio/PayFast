const fs = require('fs');

module.exports = function(app) {

    app.post("/upload/imagem", function(req, res) {
        console.log("Recebendo imagem");

        var filename = req.headers.filename;
        console.log('Arquivo recebido: ' + filename);
        req.pipe(fs.createWriteStream('files/' + filename))
            .on('finish', function() {
                console.log("Upload finalizado");
                res.status(201).send("Upload completo");
            });
    });
}