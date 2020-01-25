const modeloLivro = require('../models/livros');
const path = require('path');

module.exports = {
    //ir para a pagina para adicionar um novo livro
    adicionar: function (req, res, next) {
        res.sendFile(path.join(__dirname + '../../../../app/views/adicionar.html'));
    },
    //ir para a pagina dos livros(a tabela)
    page: function (req, res, next) {
        res.sendFile(path.join(__dirname + '../../../../app/views/livros.html'));
    },
    //ir para a pagina de detalhes dos livros
    detalhes: function (req, res, next) {
        res.sendFile(path.join(__dirname + '../../../../app/views/detalhes.html'));
    },
    //procurar um livro por id
    getById: function (req, res, next) {
        modeloLivro.findById(req.params.livroId, function (err, livroInfo) {
            if (err) {
                res.sendFile(path.join(__dirname + '../../../../app/views/erro.html'));
            } else {
                res.sendFile(path.join(__dirname + '../../../../app/views/Sucesso.html'));
            }
        });
    },
    //JSON com todos os livros
    getAll: function (req, res, next) {
        let listaLivros = [];
        modeloLivro.find({}, function (err, livros) {
            if (err) {
                res.sendFile(path.join(__dirname + '../../../../app/views/erro.html'));
            } else {
                for (let livro of livros) {
                    listaLivros.push({
                        id: livro._id,
                        nome: livro.nome,
                        dataLancamento: livro.dataLancamento
                    });
                }
                res.json({
                    livros: listaLivros
                });
            }
        });
    },
    //Fazer update a um livro
    updateById: function (req, res, next) {
        modeloLivro.findByIdAndUpdate(req.params.livroId, {
            nome: req.body.nome,
            dataLancamento: req.body.dataLancamento
        }, function (err, livroInfo) {
            if (err)
                res.sendFile(path.join(__dirname + '../../../../app/views/erro.html'));
            else {
                res.sendFile(path.join(__dirname + '../../../../app/views/Sucesso.html'));
            }
        });
    },
    //Apagar um livro
    deleteById: function (req, res, next) {
        modeloLivro.findByIdAndRemove(req.params.livroId, function (err, livroInfo) {
            if (err)
                res.sendFile(path.join(__dirname + '../../../../app/views/erro.html'));
            else {
                res.sendFile(path.join(__dirname + '../../../../app/views/Sucesso.html'));
            }
        });
    },
    //criar um novo livro
    create: function (req, res, next) {
        modeloLivro.create({
            nome: req.body.nome,
            dataLancamento: req.body.dataLancamento
        }, function (err, result) {
            if (err)
                res.sendFile(path.join(__dirname + '../../../../app/views/erro.html'));
            else
                res.sendFile(path.join(__dirname + '../../../../app/views/Sucesso.html'));
        });
    },
}