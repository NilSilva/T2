const mongoose = require('mongoose');

//Definir um schema
const Schema = mongoose.Schema;

const SchemaLivro = new Schema({
    nome: {
        type: String,
        trim: true,
        required: true,
    },
    dataLancamento: {
        type: String,
        trim: true,
        required: true
    }
});
module.exports = mongoose.model('Livro', SchemaLivro)