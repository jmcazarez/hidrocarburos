
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
            error: 'Error al obtener las empresas.',
            data: [],
        };
    }
}



async function guardarEmpresa(params) {

    try {
        console.log('empresa', params);
        let data = await sequelize.query(
            `
             CALL proc_guardar_empresa (
                ${params.nEmpresa},
                ${params.nTipo},
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

async function eliminarEmpresa(params) {
    console.log(params);
    try {
        let data = await sequelize.query(
            `
             CALL proc_eliminar_empresa (
                ${params.nEmpresa}
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
                error: 'Error al eliminar la empresa.',
                data: [],
            };
        }
      
    }
}

module.exports = {
    obtenerEmpresas,
    guardarEmpresa,
    eliminarEmpresa
};