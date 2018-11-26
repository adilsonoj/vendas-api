const mongoose = require('../../database');
const Produto = require('../models/Produto');

module.exports = {

    async list(req, res){
        try {
            const { page = 1 } = req.query;
            const produtos = await Produto.paginate({}, { page, limit:10 });
            return res.status(200).send({ produtos });
        } catch (error) {
            return res.status(400).send({error: error.errmsg});
        }
        
    },

    async show(req, res){
        
        try {
            const produto = await Produtos.findById(req.params.id);
            return res.status(200).send({ produto });
        } catch (error) {
            return res.status(400).send({error: 'Produto não encontrado'});
        }
    },

    async create(req, res){
        try {
            const produto = await Produto.create(req.body);
            return res.status(200).send({ produto });
        } catch (error) {
            return res.status(400).send({error: "erro ao incluir"});
        }
    },
    async delete(req, res){
        try {
            await Produto.findByIdAndDelete(req.params.id);
            return res.send();
        } catch (error) {
            return res.status(400).send({error: "erro ao excluir produto"});
        }
    },


    async update(req, res){
        try {
            const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new : true });
            return res.status(200).send({ produto });
        } catch (error) {
            return res.status(400).send({error: error.errmsg})
        }
        
    },

};