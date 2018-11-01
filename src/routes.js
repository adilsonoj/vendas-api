const express = require("express");
const routes = express.Router();

const ClienteController = require('./app/controllers/ClienteController');

routes.get('/cliente', ClienteController.list);
routes.post('/cliente', ClienteController.create);

module.exports = routes;