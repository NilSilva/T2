const modeloLivro = require('../models/livros');
module.exports = {
    getById: function (req, res, next) {
        console.log(req.body);

        modeloLivro.findById(req.params.livroId, function (err, livroInfo) {
            if (err) {
                next(err);
            } else {
                res.json({
                    estado: "Sucesso",
                    mensagem: "Livro encontrado!",
                    dado: {
                        livros: livroInfo
                    }
                });
            }
        });
    },
    getAll: function (req, res, next) {
        let listaLivros = [];
        modeloLivro.find({}, function (err, livros) {
            if (err) {
                next(err);
            } else {
                for (let livro of livros) {
                    listaLivros.push({
                        id: livro._id,
                        nome: livro.nome,
                        dataLancamento: livro.dataLancamento
                    });
                }
                res.json({
                    estado: "Sucesso",
                    mensagem: "Lista de livros encontrada!",
                    dado: {
                        livros: listaLivros
                    }
                });
            }
        });
    },
    updateById: function (req, res, next) {
        modeloLivro.findByIdAndUpdate(req.params.livroId, {
            nome: req.body.nome
        }, function (err, livroInfo) {
            if (err)
                next(err);
            else {
                res.json({
                    estado: "Sucesso.",
                    mensagem: "Livro editado com sucesso!",
                    dado: null
                });
            }
        });
    },
    deleteById: function (req, res, next) {
        modeloLivro.findByIdAndRemove(req.params.livroId, function (err, livroInfo) {
            if (err)
                next(err);
            else {
                res.json({
                    estado: "Sucesso.",
                    mensagem: "Livro apagado com sucesso!",
                    dado: null
                });
            }
        });
    },
    create: function (req, res, next) {
        modeloLivro.create({
            nome: req.body.nome,
            dataLancamento: req.body.dataLancamento
        }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({
                    estado: "Sucesso.",
                    mensagem: "Livro adicionado com sucesso!",
                    dado: null
                });
        });
    },
}