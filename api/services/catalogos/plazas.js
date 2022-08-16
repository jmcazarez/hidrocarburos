
const { QueryTypes } = require("sequelize");
const sequelize = require('../../db/config');

async function obtenerPlazas(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_plazas (${params.nPlaza})
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
            error: 'Error al obtener las plazas.',
            data: [],
        };
    }
}


module.exports = {
    obtenerPlazas
};