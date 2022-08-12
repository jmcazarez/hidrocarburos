
const { QueryTypes } = require("sequelize");
const sequelize = require('../../db/config');

async function obtenerEmpresas(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_empresas(${params.nEmpresa})
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



async function guardarEmpresa(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_guardar_empresa (
                ${params.nEmpresa},
                ${params.nTipo},
                '${params.cFolio}',
                '${params.cRazonSocial}',
                '${params.cRFC}',
                '${params.cCodigoPostal}',
                '${params.cPais}',
                '${params.cEstado}',
                '${params.cMunicipio}',
                '${params.cCiudad}',
                '${params.cColonia}',
                '${params.cDireccion}',
                '${params.cNombreRepresentante}',
                '${params.cApellidoPaternoRepresentante}',
                '${params.cApellidoMaternoRepresentante}',
                '',
                ''
            )
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
                error: 'Error al guardar la empresa.',
                data: [],
            };
        }
      
    }
}


module.exports = {
    obtenerEmpresas,
    guardarEmpresa
};