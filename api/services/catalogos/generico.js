
const { QueryTypes } = require("sequelize");
const sequelize = require('../../db/config');

async function obtenerCatalogosCFDI(params) {

    try {
        let regimenes = await sequelize.query(
            `
             CALL proc_regimenes_fiscales
             `,
            {
                type: QueryTypes.RAW
            }
        );

        let usos = await sequelize.query(
            `
             CALL proc_usos_cfdi
             `,
            {
                type: QueryTypes.RAW
            }
        );

        return {
            status: 200,
            error: '',
            data: {
                regimenes,
                usos
            }
        }

    } catch (err) {
        // do something
        console.log(err);
        return {
            status: 400,
            error: 'Error al obtener los catalogos para el CFDI.',
            data: [],
        };
    }
}


async function obtenerFletePorRuta(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_obtener_flete_por_ruta (${params.nRuta})
             `,
            {
                type: QueryTypes.RAW
            }
        );


        return {
            status: 200,
            error: '',
            data: data
        }

    } catch (err) {
        // do something
        console.log(err);
        return {
            status: 400,
            error: 'Error al obtener los catalogos para el CFDI.',
            data: [],
        };
    }
}


module.exports = {
    obtenerCatalogosCFDI,
    obtenerFletePorRuta
};