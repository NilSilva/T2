const express = require('express');
const router = express.Router();

const livrosController = require('../app/api/controllers/livros');

//rotas
router.get('/', livrosController.page); //rota para "host/livros/" -> tabela com todos os livros

router.get('/all', livrosController.getAll); //rota para obter um json com todos os livros

router.post('/adicionar', livrosController.create);

router.get('/adicionar', livrosController.adicionar);

router.post('/', livrosController.create);

router.get('/livro', livrosController.detalhes);

router.get('/:livroId', livrosController.getById);

router.put('/:livroId', livrosController.updateById);

router.delete('/:livroId', livrosController.deleteById);

module.exports = router;