
const { QueryTypes } = require("sequelize");
const sequelize = require('../../db/config');

async function obtenerEmpleados(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_obtener_empleados(${params.nEmpleado})
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
            error: 'Error al obtener los empleados.',
            data: [],
        };
    }
}


module.exports = {
    obtenerEmpleados
};