const express = require('express');
const logger = require('morgan');
const livros = require('./routes/livros');
const users = require('./routes/users');
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //configuração da base de dados
const path = require('path');
const cookie = require('cookie-parser');

var jwt = require('jsonwebtoken');

const app = express();

app.set('secretKey', 'nodeRestApi'); // jwt secret token

// conexão ao mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookie());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/app/views/index.html'));
});

// Rota publica
app.use('/users', users);

// Rota privada
app.use('/livros', validateUser, livros);
app.get('/favicon.ico', function (req, res) {
    res.sendStatus(204);
});

function validateUser(req, res, next) {
    console.log(req.cookies['token']);
    jwt.verify(req.cookies['token'], req.app.get('secretKey'), function (err, decoded) {
        if (err) {
            res.json({
                estado: "error",
                mensagem: err.message,
                dado: null
            });
        } else {
            // adicionar o id do utilizador ao pedido
            req.body.userId = decoded.id;
            next();
        }
    });
}

// o express não considera 'not found 404' como um erro por isso temos tratar dele explicitamente
// tratar do erro 404
app.use(function (req, res, next) {
    let err = new Error('Não encontrado...');

    err.status = 404;

    next(err);
});

// tratar de erros
app.use(function (err, req, res, next) {
    console.log(err);

    if (err.status === 404)
        res.status(404).json({ message: "Não sei onde esta essa pagina... ¯\_(ツ)_/¯" });
    else
        res.status(500).json({ message: "Algo não esta bem... ¯\_(ツ)_/¯" });
});

app.listen(3000, function () {
    console.log('Servidor no port  (•_•) ( •_•)>⌐■-■ (⌐■_■)  3000!');
});