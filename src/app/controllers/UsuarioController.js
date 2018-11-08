const mongoose = require('../../database');
const Cliente = require('../models/Usuario')

module.exports ={
   async list(req, res){
        try {
            const { page = 1 } = req.query;
            const clientes = await Cliente.paginate({}, { page, limit:10 });
            return res.status(200).send({ clientes });
        } catch (error) {
            return res.status(400).send({error: error.errmsg});
        }
        
    },
    async create(req, res){
        const { email } = req.body;
        try {
            if(await Cliente.findOne({ email }))
                return res.status(400).send({ erro: 'Usuário existente'});


            const cliente = await Cliente.create(req.body);
            cliente.password = undefined;
            return res.status(200).send({ cliente });
            
        } catch (error) {
            return res.status(400).send({error: error.errmsg});
        }
    },

    async delete(req, res){
        try {
            await Cliente.findOneAndRemove(req.params.id);
            return res.status(200);
        } catch (error) {
            return res.status(400).send({error:"erro ao excluir"});
        }
    },


    async update(req, res){
        try {
            const cliente = await Cliente.findOneAndUpdate(req.params.id, req.body, { new : true });
            return res.status(200).send({ cliente });
        } catch (error) {
            return res.status(400).send({error: error.errmsg})
        }
        
    },

} 