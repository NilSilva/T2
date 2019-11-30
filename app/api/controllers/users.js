const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

module.exports = {
    paginaRegister: function (req, res) {
        //console.log(path);
        res.sendFile(path.join(__dirname + '../../../../app/views/register.html'));
    },
    paginaAuth: function (req, res) {
        //console.log(path);
        res.sendFile(path.join(__dirname + '../../../../app/views/login.html'));
    },
    create: async function (req, res, next) {
        const UserExiste = await userModel.findOne({ email: req.body.email });

        if (UserExiste) return res.status(400).send('Este email já esta em utilização.')

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
                        
                        
                    } else {
                        res.json({
                            estado: "Erro.",
                            mensagem: "Password/email errado. (>ლ)",
                            dados: null
                        });
                    }
                }
            }
        );
    },
}