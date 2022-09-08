
const { QueryTypes } = require("sequelize");
const sequelize = require('../../db/config');

async function obtenerInvTiposDeMovimientos(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_obtener_tipos_de_movimiento_almacen(${params.nTipoMovimiento})
             `,
            {
                type: QueryTypes.RAW
            }
        );

        return {
            status: 200,
            error: '',
            data: data,
        }

    } catch (err) {
        // do something
        console.log(err);
        return {
            status: 400,
            error: 'Error al obtener los tipos de movimientos de almacen.',
            data: [],
        };
    }
}




module.exports = {
    obtenerInvTiposDeMovimientos
};