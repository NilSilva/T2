const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nome: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
});

// fazer hash à palavra passe antes de a guardar no base de dados
UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);

    next();
});

module.exports = mongoose.model('User', UserSchema);