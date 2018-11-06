const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcryptjs');

const ClienteSchema = new mongoose.Schema({
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

ClienteSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

ClienteSchema.plugin(mongoosePaginate);

mongoose.model('Cliente',  ClienteSchema);

