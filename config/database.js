//Fazer a conexão com o mongoose
const mongoose = require('mongoose'); //é uma ferramenta de modelação de objectos do MongoDB feito para trabalhar num ambiente assíncrono

const mongoDB = 'mongodb://localhost/Livros';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});

mongoose.Promise = global.Promise;

module.exports = mongoose;