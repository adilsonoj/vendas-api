const express = require("express");
const routes = express.Router();
const auth = require('./app/middlewares/auth');

const UsuarioController = require('./app/controllers/UsuarioController');
const ProdutoController = require('./app/controllers/ProdutoController');
const AutorizacaoController = require('./app/controllers/AutorizacaoController');

routes.get('/clientes', auth, UsuarioController.list);
routes.get('/clientes/:id', UsuarioController.show);
routes.post('/clientes', UsuarioController.create);
routes.delete('/clientes/:id', UsuarioController.delete);
routes.put('/clientes/:id', UsuarioController.update);

routes.get('/produtos', ProdutoController.list);
routes.get('/produtos/:id', ProdutoController.show);
routes.post('/produtos',auth, ProdutoController.create);
routes.delete('/produtos/:id', ProdutoController.delete);
routes.put('/produtos/:id', ProdutoController.update);

routes.post('/autenticar', AutorizacaoController.autenticar);
routes.post('/esqueciSenha', AutorizacaoController.esqueciSenha);
routes.post('/resetSenha', AutorizacaoController.resetSenha);


module.exports = routes;