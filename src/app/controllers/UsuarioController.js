const Cliente = require('../models/Usuario');
const token = require('../services/token');


module.exports ={
   async list(req, res){
        try {
            const { page = 1 } = req.query;
            const clientes = await Cliente.paginate({}, { page, limit:10 });
            
            return res.status(200).send({ clientes, userId: req.userId });
        } catch (error) {
            return res.status(400).send({error: error.errmsg});
        }
        
    },
    async show(req, res){
        
        try {
            const cliente = await Cliente.findById(req.params.id).populate('produto');
            return res.status(200).send({ cliente });
        } catch (error) {
            return res.status(400).send({error: 'Usuário não encontrado'});
        }
    },
    async create(req, res){
        const { email } = req.body;
        try {
            if(await Cliente.findOne({ email }))
                return res.status(400).send({ erro: 'Usuário existente'});


            const cliente = await Cliente.create(req.body);
            cliente.password = undefined;
            return res.status(200).send({ cliente, token: token({ id: cliente.id}) });
            
        } catch (error) {
            console.log(error)
            return res.status(400).send({error: "erro ao criar usário"});
        }
    },

    async delete(req, res){
        console.log(req.params.id);
        
        try {
            await Cliente.findByIdAndDelete(req.params.id);
            return res.status(200);
        } catch (error) {
            return res.status(400).send({error:"erro ao excluir"});
        }
    },


    async update(req, res){
        try {
            const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new : true });
            return res.status(200).send({ cliente });
        } catch (error) {
            return res.status(400).send({error: error.errmsg})
        }
        
    },

} 