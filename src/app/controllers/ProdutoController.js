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

    async create(req, res){
        try {
            const produto = await Produto.create(req.body);
            return res.status(200).send({ produto });
        } catch (error) {
            return res.status(400).send({error: error.errmsg});
        }
    }

};