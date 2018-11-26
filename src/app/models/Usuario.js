const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
    nome:{
        type:    String,
        require: true,
    },
    email:{
        type:    String,
        unique: true,
        lowercase: true,
        required: true,
    },
    endereco:{
        type:    String,
        require: true,
    },
    telefone:{
        type:    String,
        require: true,
    },
    bandeiraCartao:[String],

    produto:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produto'
    }],
    password:{
        type: String,
        required: true,
        select: false,
    },
    passwordResetToken:{
        type: String,
        select: false,
    },
    passwordResetExpires:{
        type: Date,
        select: false,
    },
    createAt:{
        type: Date,
        default: Date.now,
    },
});

UsuarioSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

UsuarioSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Cliente',  UsuarioSchema);

