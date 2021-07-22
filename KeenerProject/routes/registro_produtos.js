const express = require('express');
const router = express.Router();

// A expressão regular usada para extrair os argumentos
// Poderia ter sido usado o parsing do JSON, mas tal precisaria de uma formatação prévia
const regexp = /=(.+?)&/g


router.post('/registro_fluxos/:data', (req, res) => {

    //Extraindo os argumentos do endereço
    var args = [...(req.params.data).matchAll(regexp)];

    console.log(args);

    var quantity = args[0][1];
    var volume = args[1][1];
    var weight = args[2][1];
    var name = args[3][1];

    var query = `INSERT INTO PRODUCT(name,quantity,weight,volume)
            VALUES ("${name}",${quantity},${weight},${volume});`

    //Obtendo a conexão previamente estabelecida ao servidor mysql
    var con = req.app.get('con');

    //Executando a query
    con.query(query, (err, result) => {
        if (err) alert(err)
        else {
            console.log("Produto registrado com sucesso");
            res.send(result);
        }
    });
});




module.exports = router;