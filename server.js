const express = require("express");

const app = express();

app.use(express.json());

//require('./src/app/models/Usuario');

app.use('/api', require("./src/routes"));

app.listen(3001);