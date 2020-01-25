const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const express = require('express');
const cookie = require('cookie-parser');

const app = express();

app.use(cookie());

module.exports = {
    //Ir para a pagina de registo
    paginaRegister: function (req, res) {
        res.sendFile(path.join(__dirname + '../../../../app/views/register.html'));
    },
    //Ir para a pagina de login
    paginaAuth: function (req, res) {
        res.sendFile(path.join(__dirname + '../../../../app/views/login.html'));
    },
    //Criar um novo utilizador
    create: async function (req, res, next) {
        const UserExiste = await userModel.findOne({ email: req.body.email }); //ver se o email ja existe

        if (UserExiste) return res.status(400).send('Este email já esta em utilização.')//so deixa passar se o email não existir na base de dados

        userModel.create(
            {
                nome: req.body.nome,
                email: req.body.email,
                password: req.body.password
            },
            function (err, result) {
                if (err)
                    res.sendFile(path.join(__dirname + '../../../../app/views/erro.html'));
                else
                    res.sendFile(path.join(__dirname + '../../../../app/views/Sucesso.html'));
            }
        );
    },
    //Fazer login
    authenticate: function (req, res, next) {
        userModel.findOne(
            {
                email: req.body.email
            },
            function (err, userInfo) {
                if (err || userInfo == null) {
                    res.sendFile(path.join(__dirname + '../../../../app/views/erro.html'));
                } else {
                    //usar o bcrypt para verificar de a palavra passe inserida é a correta
                    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                        //gerar o token
                        const token = jwt.sign({
                            id: userInfo._id
                        }, req.app.get('secretKey'), {
                            expiresIn: '1h'
                        });

                        //adicionar o token às cookies
                        res.cookie('token', token);

                        res.sendFile(path.join(__dirname + '../../../../app/views/Sucesso.html'));
                    } else {
                        res.sendFile(path.join(__dirname + '../../../../app/views/erro.html'));
                    }
                }
            }
        );
    },
}