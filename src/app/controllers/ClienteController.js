const mongoose = require('../../database');
const Cliente = mongoose.model('Cliente');

module.exports ={
   async list(req, res){
        try {
            const clientes = await Cliente.find();
            return res.status(200).send({ clientes });
        } catch (error) {
            return res.status(400).send({error: error});
        }
        
    },
    async create(req, res){
        try {
            const cliente = await Cliente.create(req.body);
            return res.status(200).send({ cliente });
        } catch (error) {
            return res.status(400).send({error: error.errmsg});
        }
    }
} 