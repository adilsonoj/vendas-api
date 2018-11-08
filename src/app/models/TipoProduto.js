const mongoose = require('mongoose');

const TipoProdutoSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    createAt:{
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model("TipoProduto", TipoProdutoSchema);