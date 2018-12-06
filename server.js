const express = require("express");
const { port } = require("./src/config/config");
const app = express();

require('./src/database')

app.use(express.json());

app.use('/api', require("./src/routes"));

app.listen(port, ()=> console.info(`servidor rodando na porta ${port}`));