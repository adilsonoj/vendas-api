const Produto = require('../models/Produto');
const Cliente = require('../models/Usuario');

module.exports = {

    async index(req, res) {
        try {
            const { page = 1 } = req.query;
            const produtos = await Produto.paginate({}, { page, limit: 10,  populate: 'usuario' });
            return res.status(200).send({ produtos });
        } catch (error) {
            return res.status(400).send({ error: error.errmsg });
        }

    },

    async show(req, res) {
        console.log(req.params.id)
        try {
            const produto = await Produto.findById(req.params.id).populate('usuario');
            return res.status(200).send({ produto });
        } catch (error) {
            console.log(error)
            return res.status(400).send({ error: 'Produto não encontrado' });
        }
    },

    async store(req, res) {
        console.log({ userId: req.userId })
        try {
            req.body.usuario = req.userId;
            const produto = await Produto.create(req.body);

            //Atualiza cliente LOGADO adicionando o produto
            await Cliente.findByIdAndUpdate(req.userId, {
                $addToSet: { produto: produto.id }
            },
                { safe: true, upsert: true },
                (err, model) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).send({ error: "erro ao atualizar produto de Cliente" });
                    }

                })
            return res.status(200).send({ produto });
        } catch (error) {
            console.log(error)
            return res.status(400).send({ error: "erro ao incluir" });
        }
    },
    async destroy(req, res) {
        try {
            await Produto.findByIdAndDelete(req.params.id);

             //Atualiza cliente LOGADO removendo o produto
            await Cliente.findByIdAndUpdate(req.userId, {
                $pull: { produto: req.params.id }
            },
                { safe: true },
                (err, model) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).send({ error: "erro ao atualizar produto de Cliente" });
                    }

                })


            return res.send();
        } catch (error) {
            return res.status(400).send({ error: "erro ao excluir produto" });
        }
    },


    async update(req, res) {
        try {
            const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });

            return res.status(200).send({ produto });
        } catch (error) {
            return res.status(400).send({ error: error.errmsg })
        }

    },

};