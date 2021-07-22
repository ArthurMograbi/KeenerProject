const express = require('express');
const router = express.Router();

//Contêm e redireciona para a familia de rotas
router.use('/', require('./listar_produtos'));

router.use('/', require('./listar_fluxos'));

router.use('/', require('./registro_produtos'));

router.use('/', require('./registro_fluxos'));

router.use('/', require('./do_login'));

router.use('/', require('./registrar_usuario'));

module.exports = router;