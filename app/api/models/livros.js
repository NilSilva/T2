const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const SchemaLivro = new Schema({
    nome: {
        type: String,
        trim: true,
        required: true,
    },
    dataLancamento: {
        type: Date,
        trim: true,
        required: true
    }
});
module.exports = mongoose.model('Livro', SchemaLivro)