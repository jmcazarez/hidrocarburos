
const { QueryTypes } = require("sequelize");
const sequelize = require('../../db/config');

async function obtenerProveedores(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_obtener_proveedores(${params.nProveedor})
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
            error: 'Error al obtener los proveedores.',
            data: [],
        };
    }
}


async function guardarProveedor(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_guardar_proveedor (
                '${params.nProveedor}',
                '${params.cRFC}',
                '${params.bPersonaFisica}',
                '${params.cDescripcion}',
                '${params.cNombreComercial}',
                '${params.cNombre}',
                '${params.cApellidoPaterno}',
                '${params.cApellidoMaterno}',
                '${params.cCURP}',
                '${params.cTelefono}',
                '${params.cCelular}',
                '${params.cNacionalidad}',
                '${params.cContacto}',
                '${params.cEstado}',
                '${params.cMunicipio}',
                '${params.cColonia}',
                '${params.cDireccion}',
                '${params.nCodigoPostal}',
                '${params.cDiasEntrega}',
                '${params.nFormaPago}',
                '${params.nLimiteCredito}',
                '${params.nDiasCredito}',
                '${params.bActivo}'
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
            error: 'Error al guardar al proveedor.',
            data: [],
        };
    }
}


async function cancelarProveedor(params) {
    console.log(params);
    try {
        let data = await sequelize.query(
            `
             CALL proc_eliminar_proveedor (
                ${params.nProveedor}
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
                error: 'Error al eliminar proveedor.',
                data: [],
            };
        }
      
    }
}


module.exports = {
    guardarProveedor,
    obtenerProveedores,
    cancelarProveedor
};