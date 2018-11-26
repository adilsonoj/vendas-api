const mongoose = require('../../database');
const crypto = require("crypto");
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const token = require('../servicos/token');
//const mailer = require('../../modules/mailer');
/* 
function generateToken(params = {}){
    return jwt.sign(params ,  auth.secret,  { expiresIn: 86400 });
}; */

module.exports = {

async registro(req, res){
    const {email} = req.body;
    try {
        
        if(await Usuario.findOne({email})){
            console.log("achou");
            return res.status(400).send({ error: 'Usuário existente'});
        }
         

        const usuario = await Usuario.create(req.body);

        usuario.password = undefined;
        return res.send({ usuario, token: token({ id: usuario.id}) })
     } catch (error) {
         return res.status(400).send({error: 'Registration failed'});
     }   

},

async autenticar(req, res){
    const { email, password } = req.body;

    const usuario = await Usuario.findOne( { email }).select('+password');

    if(!usuario)
        return res.status(400).send({ error: 'Usuario not found'});

    if(!await bcrypt.compare(password, usuario.password))
        return res.status(400).send({ error: 'Invalid password'});

        usuario.password = undefined;

        //const token = generateToken({ id: Usuario.id});

        res.send({ usuario, token: token({ id: usuario.id}) })
        

},

/* async forgotPassword(req, res){
    const { email } = req.body;
   
    try {
        const usuario = await Usuario.findOne({ email });
        
        if(!Usuario) 
            return res.status(400).send({ error: 'Usuario not found'});

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
            context: {token}
        }, (err)=>{
            if (err)
            return res.status(400).send({ error: 'Cannot send forgot password email'});

            return res.send();
        });

    } catch (error) {
        return res.status(400).send({ error: 'Error on forgot password, try again'});
    }
}, */

async resetPassword(req, res){
    const { email, token, password }  = req.body;

    const usuario = await Usuario.findOne({ email }).select('+passwordResetToken passwordResetExpires');
        
    if(!usuario) 
        return res.status(400).send({ error: 'Usuario not found'});

    if(token != usuario.passwordResetToken)
        return res.status(400).send({ error: 'Token invalid'});

    const now = new Date();
    if(now > usuario.passwordResetExpires)
        return res.status(400).send({ error: 'Token expired, gernerate a new one'});

    usuario.password = password;

    await usuario.save();

    return res.send();

    try {
        
    } catch (error) {
        return res.status(400).send({ error: 'Cannot send forgot password email'});

    }
}

};