const TipoProduto = require('../models/TipoProduto');

module.exports ={
    async index(req, res){
         try {
             const tipo  = await TipoProduto.find().sort('nome');
             
             return res.status(200).send(tipo);
         } catch (error) {
             return res.status(400).send({error: error.errmsg});
         }
         
     },
     async store(req, res){
        const { nome } = req.body;
        try {
            if(await TipoProduto.findOne({ nome }))
                return res.status(400).send({ erro: 'Tipo já existente' });


            const tipo = await TipoProduto.create(req.body);
           
            return res.status(200).send({ tipo });
            
        } catch (error) {
            console.log(error)
            return res.status(400).send({error: "erro ao criar tipo de produto"});
        }
    },
    async destroy(req, res){
        try {
           
                await TipoProduto.findOneAndRemove({ '_id': req.params.id });
            
            return res.send();
        } catch (error) {
            return res.status(400).send({ error: "erro ao excluir tipo de produto" });
        }
    },
    async update(req, res){
        try {
            const tipo = await TipoProduto.findByIdAndUpdate(req.params.id, req.body, { new : true });
            return res.status(200).send({ tipo });
        } catch (error) {
            return res.status(400).send({error: "erro ao tentar atualizar usuário"})
        }
        
    }

}