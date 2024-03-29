
const { QueryTypes } = require("sequelize");
const sequelize = require('../../db/config');

async function obtenerArticulos(params) {

    try {

        console.log('articulos',params.nArticulo);
        let data = await sequelize.query(
            `
             CALL proc_obtener_articulos(${params.nArticulo}, ${ params.bNacional || null })
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
            error: 'Error al obtener los artículos.',
            data: [],
        };
    }
}



async function guardarArticulo(params) {

    try {        
        let data = await sequelize.query(
            `
             CALL proc_guardar_articulo (
                ${params.nArticulo},
                '${params.cDescripcionCorta}',
                '${params.cDescripcionLarga}',
                '${params.nStockMinimo}',
                '${params.bNacional}'
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
                error: 'Error al guardar el artículo.',
                data: [],
            };
        }
      
    }
}

async function eliminarArticulo(params) {
    console.log(params);
    try {
        let data = await sequelize.query(
            `
             CALL proc_eliminar_articulo (
                ${params.nArticulo}
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
                error: 'Error al eliminar el artículo.',
                data: [],
            };
        }
      
    }
}

module.exports = {
    obtenerArticulos,
    guardarArticulo,
    eliminarArticulo
};