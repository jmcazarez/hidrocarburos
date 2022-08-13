
const { QueryTypes } = require("sequelize");
const sequelize = require('../../db/config');

async function obtenerClientes(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_clientes(${params.nCliente})
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
            error: 'Error al obtener los clientes.',
            data: [],
        };
    }
}



async function guardarCliente(params) {

    try {

        let data = await sequelize.query(
            `
             CALL proc_guardar_cliente (
                ${params.nCliente},
                ${params.nTipo},
                '${params.cRazonSocial}',
                '${params.cNombre}',
                '${params.cApellidoPaterno}',
                '${params.cApellidoMaterno}',
                '${params.cSexo}',
                '${params.dFechaNacimiento}',
                '${params.cPais}',
                '${params.cEstado}',
                '${params.cMunicipio}',
                '${params.cCURP}',
                '${params.cRFC}',
                '${params.cDireccion}',
                '${params.cNumeroExterior}',
                '${params.cNumeroInterior}',
                '${params.cColonia}',
                '${params.cCodigoPostal}',
                '${params.cTelefono}',
                '${params.cCelular}',
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
                error: 'Error al guardar el cliente.',
                data: [],
            };
        }
      
    }
}

async function eliminarCliente(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_eliminar_cliente (
                ${params.nCliente}
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
                error: 'Error al eliminar el cliente.',
                data: [],
            };
        }
      
    }
}

module.exports = {
    obtenerClientes,
    guardarCliente,
    eliminarCliente
};