const auth  = require('../../config/auth');
const jwt = require('jsonwebtoken');


   
module.exports = (params = {}) => {
    return jwt.sign(params ,  auth.secret,  { expiresIn: 86400 });
    };

    
