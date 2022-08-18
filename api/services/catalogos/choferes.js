
const { QueryTypes } = require("sequelize");
const sequelize = require('../../db/config');

async function obtenerChoferes(params) {
console.log(params);
    try {
        let data = await sequelize.query(
            `
             CALL proc_obtener_choferes(${params.nChofer})
             `,
            {
                type: QueryTypes.RAW
            }
        );

        console.log(data);

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
            error: 'Error al obtener los choferes.',
            data: [],
        };
    }
}


async function guardarChofer(params) {

    try {
        console.log(params);
        let data = await sequelize.query(
            `
             CALL proc_guardar_chofer (
                '${params.nChofer}',
                '${params.cRFC}',
                '${params.cNombre}',
                '${params.cApellidoPaterno}',
                '${params.cApellidoMaterno}',
                '${params.cLicencia}',
                ${params.nAntiguedad},
                ${params.nFletera}
             )
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
            error: 'Error al guardar al chofer.',
            data: [],
        };
    }
}


async function cancelarChofer(params) {
    console.log(params);
    try {
        let data = await sequelize.query(
            `
             CALL proc_eliminar_chofer (
                ${params.nChofer}
            )
             `,
            {
                type: QueryTypes.INSERT
            }
        );

        return {
            status: 200,
            error: '',
            data: []
        }

    } catch (err) {
        // do something

        console.log(err);
        if (err) {
            return {
                status: 400,
                error: err,
                data: [],
            };
        } else {
            return {
                status: 400,
                error: 'Error al eliminar chofer.',
                data: [],
            };
        }

    }
}


module.exports = {
    guardarChofer,
    obtenerChoferes,
    cancelarChofer
};