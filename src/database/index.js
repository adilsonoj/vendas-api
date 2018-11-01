const mongoose = require('mongoose');

//Iniciando o DB
mongoose.connect('mongodb://localhost:27017/vendasapi', { useNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;