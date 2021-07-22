const express = require('express');
const router = express.Router();

// A expressão regular usada para extrair os argumentos
// Poderia ter sido usado o parsing do JSON, mas tal precisaria de uma formatação prévia
const regexp = /=(.+?)&/g


router.post('/registro_fluxos/:data', (req, res) => {

    //Extraindo os argumentos do endereço
    var args = [...(req.params.data).matchAll(regexp)];


    var pid, quant, cost, isimport,query;
    pid = args[0][1];
    quant = args[1][1];
    cost = args[2][1];
    mdate = args[5][1];
    isimport = args[6][1] == "false" ? 0 : 1;

    query = `INSERT INTO movement(productid, quantity, cost, fromto, mdate, isimport)
                VALUES(${pid},${quant},${cost},"Home Depot",CURRENT_TIMESTAMP,${isimport});`

    //Obtendo a conexão previamente estabelecida ao servidor mysql
    var con = req.app.get('con');

    //Executando a query
    con.query(query, (err, result) => {
        if (err) alert(err)
        else {
            console.log("Fluxo registrado com sucesso!");
            res.send(result);
        }
        
    });
});




module.exports = router;