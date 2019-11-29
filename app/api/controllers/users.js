const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

module.exports = {
    paginaRegister: function(req, res){
        //console.log(path);
        res.sendFile(path.join(__dirname + '../../../../app/views/register.html'));
    },
    paginaAuth: function(req, res){
        //console.log(path);
        res.sendFile(path.join(__dirname + '../../../../app/views/register.html'));
    },
    create: function (req, res, next) {
        userModel.create(
            {
                nome: req.body.nome,
                email: req.body.email,
                password: req.body.password
            },
            function (err, result) {
                if (err)
                    next(err);
                else
                    res.sendFile(path.join(__dirname + '../../../../app/views/Sucesso.html'));
            }
        );
    },
    authenticate: function (req, res, next) {
        userModel.findOne(
            {
                email: req.body.email
            },
            function (err, userInfo) {
                if (err) {
                    next(err);
                } else {
                    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                        const token = jwt.sign({
                            id: userInfo._id
                        }, req.app.get('secretKey'), {
                            expiresIn: '1h'
                        });
                        res.json({
                            estado: "Sucesso.",
                            mensagem: "Utilizador encontrado!",
                            data: {
                                user: userInfo,
                                token: token
                            }
                        });
                    } else {
                        res.json({
                            estado: "error",
                            mensagem: "Invalid email/password!!!",
                            dados: null
                        });
                    }
                }
            }
        );
    },
}