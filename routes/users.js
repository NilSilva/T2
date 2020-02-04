const express = require('express');
const router = express.Router();

//controlador dos utilizadores
const userController = require('../app/api/controllers/users');

//rotas
router.get('/register', userController.paginaRegister); //rota para ir para a pagina de registo

router.post('/register', userController.create); //rota para criar um novo utilizador

router.get('/authenticate', userController.paginaAuth); //rota para ir para a pagina de login

router.post('/authenticate', userController.authenticate); //rota para fazer login

router.get('/editar', userController.paginaEditar); //rota para ir para a pagina de editar o utilizador

router.get('/procurar/:UserID', userController.procurarPorID); //rota para procurar pelo id

router.post('/editar', userController.updateById); //rota para editar um utilizador

module.exports = router;