'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta';

exports.createToken = function(usuario) {
    
    var payload = {
        nPersonal: usuario.nPersonal,
        cLogin: usuario.cLogin,
        cNombre: usuario.cNombre,
        cApellidoPaterno: usuario.cApellidoPaterno,
        cApellidoMaterno: usuario.cApellidoMaterno,
        cEmail: usuario.cEmail,
        iat: moment().unix(),
        exp: moment().add(1, "days").unix,
    };
    
    return jwt.encode(payload, secret);
};