
const { QueryTypes } = require("sequelize");
const sequelize = require('../../db/config');

async function obtenerFleteras(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_fleteras(${params.nFletera})
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
            error: 'Error al obtener las fleteras.',
            data: [],
        };
    }
}



async function guardarFletera(params) {

    try {

        let data = await sequelize.query(
            `
             CALL proc_guardar_fletera (
                ${params.nFletera},
                '${params.cDescripcion}',
                '${params.cTelefono}',
                '${params.cContacto}',
                '${params.cCorreoElectronico}'
            )
             `,
            {
                type: QueryTypes.INSERT
            }
        );

        return {
            status: 200,
            error: '',
            data: data[0],
        }

    } catch (err) {
        // do something
     
        console.log(err);
        if(err){
            return {
                status: 400,
                error: err,
                data: [],
            };
        }else{
            return {
                status: 400,
                error: 'Error al guardar la fletera.',
                data: [],
            };
        }
      
    }
}

async function eliminarFletera(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_eliminar_fletera (
                ${params.nFletera}
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
        if(err){
            return {
                status: 400,
                error: err,
                data: [],
            };
        }else{
            return {
                status: 400,
                error: 'Error al eliminar la fletera.',
                data: [],
            };
        }
      
    }
}

module.exports = {
    obtenerFleteras,
    guardarFletera,
    eliminarFletera
};