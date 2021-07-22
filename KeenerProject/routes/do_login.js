const express = require('express');
const router = express.Router();

// A express�o regular usada para extrair os argumentos
// Poderia ter sido usado o parsing do JSON, mas tal precisaria de uma formata��o pr�via
const regexp = /=(.+?)&/g       


router.post('/do_login/:data', (req, res) => {
    //Extraindo os argumentos do endere�o
    var args = [...(req.params.data).matchAll(regexp)];

    var username = args[0][1];                          

    var query = `SELECT * FROM users WHERE username="${username}";`

    //Obtendo a conex�o previamente estabelecida ao servidor mysql
    var con = req.app.get('con');                                        

    //Executando a query
    con.query(query, (err, result) => {
        if (err) alert(err);
        
        if (result.length < 1) res.send("USERNAME_INV")         //Caso n�o haja nenhum usuario com o username inserido
        else {
            res.send(String(result[0].pw));                     //Retorna o hash guardado no bd para ser verificado
        };

    });
});



module.exports = router;