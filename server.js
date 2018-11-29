const express = require("express");

const app = express();

require('./src/database')

app.use(express.json());

app.use('/api', require("./src/routes"));

app.listen(3001);