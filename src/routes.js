const express = require("express");
const routes = express.Router();

const UsuarioController = require('./app/controllers/UsuarioController');
const ProdutoController = require('./app/controllers/ProdutoController');
const AuthController = require('./app/controllers/AuthController');

routes.get('/clientes', UsuarioController.list);
routes.get('/clientes/:id', UsuarioController.show);
routes.post('/clientes', UsuarioController.create);
routes.delete('/clientes/:id', UsuarioController.delete);
routes.put('/clientes/:id', UsuarioController.update);

routes.get('/produtos', ProdutoController.list);
routes.get('/produtos/:id', ProdutoController.show);
routes.post('/produtos', ProdutoController.create);
routes.delete('/produtos/:id', ProdutoController.delete);
routes.put('/produtos/:id', ProdutoController.update);

routes.post('/autenticar', AuthController.autenticar);


module.exports = routes;