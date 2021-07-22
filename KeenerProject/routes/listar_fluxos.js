const express = require('express');
const router = express.Router();



router.get('/listar_fluxos', (req, res) => {

    //Obtendo a conexão previamente estabelecida ao servidor mysql
    let con = req.app.get('con');

    //Executando a query
    con.query(`SELECT product.name,fromto,mdate,cost,movement.id,movement.quantity,
                CASE WHEN isimport=1
                THEN "Importacao"
                ELSE "Exportacao" END AS isimportnew
                FROM movement JOIN product
                ON movement.productid = product.id`
        , (err, result) => {
            if (err) alert(err);
            res.send(result);       //Retornando o resultado da query
    });
});


module.exports = router;