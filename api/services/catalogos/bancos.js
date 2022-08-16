
const { QueryTypes } = require("sequelize");
const sequelize = require('../../db/config');

async function obtenerBancos(params) {

    try {
        console.log('entro');
        let data = await sequelize.query(
            `
             CALL proc_obtener_bancos(${params.nBanco})
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
            error: 'Error al obtener los bancos.',
            data: [],
        };
    }
}



module.exports = {
    obtenerBancos
};