
const { QueryTypes } = require("sequelize");
const sequelize = require('../../db/config');

async function guardarProveedor(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_guardar_proveedor
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
            error: 'Error al guardar al proveedor.',
            data: [],
        };
    }
}



module.exports = {
    guardarProveedor
};