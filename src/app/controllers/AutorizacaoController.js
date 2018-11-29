//const mongoose = require('../../database');
const crypto = require("crypto");
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const token = require('../services/token');
const mailer = require('../../modules/mailer');


module.exports = {

async registro(req, res){
    const {email} = req.body;
    try {
        
        if(await Usuario.findOne({email})){
            return res.status(400).send({ error: 'Usuário já existe' });
        }

        const usuario = await Usuario.create(req.body);

        usuario.password = undefined;
        return res.send({ usuario, token: token({ id: usuario.id}) })
     } catch (error) {
         return res.status(400).send({ error: 'Falha no registro' });
     }   

},

async autenticar(req, res){
    const { email, password } = req.body;

    const usuario = await Usuario.findOne( { email }).select('+password');

    if(!usuario)
        return res.status(400).send({ error: 'Usuario não encontrador' });

    if(!await bcrypt.compare(password, usuario.password))
        return res.status(400).send({ error: 'Senha inválida'});

        usuario.password = undefined;

        res.send({ usuario, token: token({ id: usuario.id}) })
        

},

async esqueciSenha(req, res){
    const { email } = req.body;
   
    try {
        const usuario = await Usuario.findOne({ email });
        
        if(!Usuario) 
            return res.status(400).send({ error: 'Usuario não encontrado' });

        //criar token para trocar senha
        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await Usuario.findByIdAndUpdate(usuario.id, {
            '$set':{
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });
        console.log(token);
        mailer.sendMail({
            to: email,
            from: 'adilsonoj@yahoo.com.br',
            template: '/forgot_password',
            context: { token }
        }, (err)=>{
            if (err)
            return res.status(400).send({ error: 'Não foi possível enviar email de recuperação de senha' });

            return res.send();
        });

    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'Erro ao recuperar a senha, tente novamente' });
    }
},

async resetSenha(req, res){
    const { email, token, password }  = req.body;

    try {
        const usuario = await Usuario.findOne({ email }).select('+passwordResetToken passwordResetExpires');
        
    if(!usuario) 
        return res.status(400).send({ error: 'Usuario não encontrado '});

    if(token != usuario.passwordResetToken)
        return res.status(400).send({ error: 'Token inválido' });

    const now = new Date();
    if(now > usuario.passwordResetExpires)
        return res.status(400).send({ error: 'Token expirou, gere um novo' });

    usuario.password = password;

    await usuario.save();

    return res.send();
    } catch (error) {
        return res.status(400).send({ error: 'Não foi possível alterar a senha' });

    }
}

};