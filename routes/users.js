const express = require('express');
const router = express.Router();

//controlador dos utilizadores
const userController = require('../app/api/controllers/users');

//rotas
router.post('/register', userController.create); //rota para criar um novo utilizador

router.post('/authenticate', userController.authenticate); //rota para fazer login

router.get('/procurar/:UserID', userController.procurarPorID); //rota para procurar pelo id

router.post('/editar', userController.updateById); //rota para editar um utilizador

module.exports = router;