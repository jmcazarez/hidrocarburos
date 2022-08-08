'use strict'

var app = require('./app');
// var redis = require('./redis');

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log(`Servidor API funcionando en el puerto: ${ port }`);
});
