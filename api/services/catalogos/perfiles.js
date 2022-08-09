
const { QueryTypes } = require("sequelize");
const sequelize = require('../../db/config');

async function obtenerPerfiles(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_perfiles(${params.nPerfil})
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
            error: 'Error al obtener los perfiles.',
            data: [],
        };
    }
}



async function guardarPerfil(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_guardar_perfil('${params.cDescripcion}')
             `,
            {
                type: QueryTypes.INSERT
            }
        );
        console.log(data[0]);

        return {
            status: 200,
            error: '',
            data: data[0],
        }

    } catch (err) {
        // do something
     
        console.log(err.errors[0]);
        if(err.errors[0]){
            return {
                status: 400,
                error: err.errors[0],
                data: [],
            };
        }else{
            return {
                status: 400,
                error: 'Error al guardar el perfil.',
                data: [],
            };
        }
      
    }
}


module.exports = {
    obtenerPerfiles,
    guardarPerfil
};