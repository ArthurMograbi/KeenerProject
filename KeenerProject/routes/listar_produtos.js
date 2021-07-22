const express = require('express');
const router = express.Router();



router.get('/listar_produtos', (req, res) => {

    //Obtendo a conexão previamente estabelecida ao servidor mysql
    let con = req.app.get('con');

    //Executando a query
    con.query("SELECT * FROM product WHERE quantity>0", (err, result) => {
        if (err) alert(err);
        res.send(result);                                                   //Retornando o resultado da query
    });
});


module.exports = router;