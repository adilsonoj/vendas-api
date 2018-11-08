const express = require("express");
const routes = express.Router();

const UsuarioController = require('./app/controllers/UsuarioController');

routes.get('/cliente', UsuarioController.list);
routes.post('/cliente', UsuarioController.create);

module.exports = routes;