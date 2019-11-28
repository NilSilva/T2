const express = require('express');
const router = express.Router();
const livrosController = require('../app/api/controllers/livros');

router.get('/', livrosController.getAll);

router.post('/', livrosController.create);

router.get('/:livroId', livrosController.getById);

router.put('/:livroId', livrosController.updateById);

router.delete('/:livroId', livrosController.deleteById);

module.exports = router;