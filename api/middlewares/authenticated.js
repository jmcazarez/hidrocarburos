'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta';

exports.validateToken = function(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'La petición no tiene el header de authorization' });
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        const bearer = token.split(' ');
        token = bearer[1];
        console.log('token:', token);
        var payload = jwt.decode(token, secret);
        if (payload.exp <= moment().unix()) {
            return res.status(404).send({ message: 'Token expirado' });
        }
    } catch (ex) {
        // console.log(ex);
        return res.status(404).send({ message: 'Token incorrecto' });
    }

    req.user = payload;

    next();
}