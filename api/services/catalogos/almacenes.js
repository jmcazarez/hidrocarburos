
const { QueryTypes } = require("sequelize");
const sequelize = require('../../db/config');

async function obtenerAlmacenes(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_almacenes(${params.nAlmacen})
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
            error: 'Error al obtener los almacenes.',
            data: [],
        };
    }
}



async function guardarAlmacen(params) {

    try {

        let data = await sequelize.query(
            `
             CALL proc_guardar_almacen (
                ${params.nAlmacen},
                '${params.cDescripcion}',
                '${params.cDomicilio}'
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
                error: 'Error al guardar el almacen.',
                data: [],
            };
        }
      
    }
}

async function eliminarAlmacen(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_eliminar_almacen (
                ${params.nAlmacen}
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
                error: 'Error al eliminar el almacen.',
                data: [],
            };
        }
      
    }
}

module.exports = {
    obtenerAlmacenes,
    guardarAlmacen,
    eliminarAlmacen
};