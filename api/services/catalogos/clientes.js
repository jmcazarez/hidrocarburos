
const { QueryTypes } = require("sequelize");
const sequelize = require('../../db/config');

async function obtenerClientes(params) {

    try {

           return {
                status: 200,
                error: '',
                data: [{
                    nCliente: 1,
                    cNombre: 'cliente 1',
                    // agregar mas campos
                }, {
                    nCliente: 2,
                    cNombre: 'cliente 2',
                }],
           }

    } catch (err) {
        // do something
        console.log(err);
        return {
            status: 400,
            error: 'Error al obtener los clientes.',
            data: [],
        };
    }
}


module.exports = {
    obtenerClientes
};