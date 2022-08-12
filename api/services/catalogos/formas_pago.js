
const { QueryTypes } = require("sequelize");
const sequelize = require('../../db/config');

async function obtenerFormasPago(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_obtener_forma_pago
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
            error: 'Error al obtener las formas de pago.',
            data: [],
        };
    }
}



module.exports = {
    obtenerFormasPago
};