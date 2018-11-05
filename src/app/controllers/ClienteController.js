const mongoose = require('../../database');
const Cliente = mongoose.model('Cliente');

module.exports ={
   async list(req, res){
        try {
            const clientes = await Cliente.find();
            return res.status(200).send({ clientes });
        } catch (error) {
            return res.status(400).send({error: error.errmsg});
        }
        
    },
    async create(req, res){
        try {
            
            if(await Cliente.findOne(req.body.email))
                return res.status(400).send({error: "Cliente já existente"});

            const cliente = await Cliente.create(req.body);
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