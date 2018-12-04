const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ProdutoSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    descricao:{
        type: String,
        required: true
    },
    preco:{
        type: Number,
        required: true
    },
    tipoProduto:{
        type: String,
        required: true
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    imagem:[],
    ativo:Boolean,
    createAt:{
        type: Date,
        default: Date.now,
    },
});

ProdutoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Produto", ProdutoSchema);