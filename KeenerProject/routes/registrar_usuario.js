const express = require('express');
const router = express.Router();

// A expressão regular usada para extrair os argumentos
// Poderia ter sido usado o parsing do JSON, mas tal precisaria de uma formatação prévia
const regexp = /=(.+?)&/g



router.post('/registrar_usuario/:data', (req, res) => {


    //Extraindo os argumentos do endereço
    var args = [...(req.params.data).matchAll(regexp)];

    var username = args[0][1];
    var hpw = args[1][1];

    query = `INSERT INTO users(username,pw,permissions)
            VALUES ("${username}","${hpw}",15);`

    //Obtendo a conexão previamente estabelecida ao servidor mysql
    var con = req.app.get('con');

    //Executando a query
    con.query(query, (err, result) => {
        if (err) alert(err)
        else res.send(result);

    });
});




module.exports = router;