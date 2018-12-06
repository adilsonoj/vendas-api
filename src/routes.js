const express = require("express");
const routes = express.Router();
const auth = require('./app/middlewares/auth');

const UsuarioController = require('./app/controllers/UsuarioController');
const ProdutoController = require('./app/controllers/ProdutoController');
const AutorizacaoController = require('./app/controllers/AutorizacaoController');
const TipoProdutoController = require('./app/controllers/TipoProdutoController');

routes.all('/clientes*', auth);
routes.all('/produtos*', auth);
routes.all('/produtos*', auth);

routes.get('/clientes',  UsuarioController.index);
routes.get('/clientes/:id', UsuarioController.show);
routes.post('/clientes', UsuarioController.store);
routes.delete('/clientes/:id', UsuarioController.destroy);
routes.put('/clientes/:id', UsuarioController.update);

routes.get('/produtos', ProdutoController.index);
routes.get('/produtos/:id', ProdutoController.show);
routes.post('/produtos',auth, ProdutoController.store);
routes.delete('/produtos/:id', ProdutoController.destroy);
routes.put('/produtos/:id', ProdutoController.update);

routes.get('/tipos', TipoProdutoController.index);
routes.post('/tipos', TipoProdutoController.store);
routes.delete('/tipos/:id',TipoProdutoController.destroy);
routes.put('/tipos/:id', TipoProdutoController.update);

routes.post('/registro', AutorizacaoController.registro);
routes.post('/autenticar', AutorizacaoController.autenticar);
routes.post('/esqueciSenha', AutorizacaoController.esqueciSenha);
routes.post('/resetSenha', AutorizacaoController.resetSenha);


module.exports = routes;