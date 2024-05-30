const mongoose = require('mongoose');

const Funcionario = mongoose.model('Funcionario', {
    nome: String,
    cargo: String,
    salario: Number,
    contratado: Boolean,
});

module.exports = Funcionario;