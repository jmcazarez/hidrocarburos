
const { QueryTypes } = require("sequelize");
const sequelize = require('../../db/config');

async function obtenerCompras(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_obtener_registro_de_compras(${params.nCompra})
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
            error: 'Error al obtener las compras.',
            data: [],
        };
    }
}



async function guardarCompra(params) {

    const t = await sequelize.transaction();

    try {
        
        let data = await sequelize.query(
            `
             CALL proc_guardar_registro_de_compra (
                ${params.nCompra},
                '${params.cTipoCompra}',
                ${params.nEmpresa},
                ${params.nAlmacen},
                ${params.nProveedor},
                ${ params.cFactura ? "'" + params.cFactura + "'" : null },
                ${ params.dFechaFactura ? "'" + params.dFechaFactura + "'" : null },
                ${ params.cTicket ? "'" + params.cTicket + "'" : null },
                ${params.nFletera},
                ${params.nChofer},
                '${params.cNumeroTrailer}',
                ${params.nArticulo},
                '${params.cFuller1}',
                '${params.cSellos1}',
                '${params.cFuller2}',
                '${params.cSellos2}',
                ${params.nLitrosCompra},
                ${params.nTipoCambio},
                ${params.nCostoTotal},
                ${params.nCostoCruce},
                ${params.nCostoFactura},
                ${params.nCostoFlete},
                ${1},
                ${params.nGalonesCompra},
                ${params.nCostoGalon},
                '${params.dFechaCompra}',
                ${params.nCostoLitro}
            )
             `,
            {
                type: QueryTypes.INSERT
            }
        );

        await t.commit();

        return {
            status: 200,
            error: '',
            data: data[0],
        }

    } catch (err) {
        // do something
        await t.rollback();
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
                error: 'Error al guardar la compra.',
                data: [],
            };
        }

    }
}

async function cancelarCompra(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_eliminar_registro_de_compra (
                ${params.nCompra},
                ${params.nUsuario},
                '${params.cMotivoCancelacion}',
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
                error: 'Error al eliminar la compra.',
                data: [],
            };
        }

    }
}

async function obtenerConsultaCompras(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_consulta_compras(
                '${params.cTipoCompra}',
                 '${params.dFechaInicio}',
                 '${params.dFechaFin}',
                 ${params.nCompra},
                 ${params.nEmpresa},
                 ${params.nProveedor},
                 ${params.nAlmacen},
                 ${params.nArticulo},
                 '${params.cFactura || ''}'
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
            error: 'Error al obtener las compras.',
            data: [],
        };
    }
}


async function confirmarCompra(params) {

    try {

        console.log('entro');
        let data = await sequelize.query(
            `
             CALL proc_confirmacion_compra(
                 ${params.nCompra},
                 ${params.nLitrosRecepcion},
                 '${params.dFechaRecepcion}'
            )
             `,
            {
                type: QueryTypes.RAW
            }
        );
        if (!data) {
            return {
                status: 300,
                error: 'Error al confirmar la recepción de la compra',
                data: [],
            }
        }
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
            error: 'Error al confirmar la compra.',
            data: [],
        };
    }
}
async function actualizarEstatusCompra(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_actualizar_estatus_compra(
                 ${params.nCompra},
                 ${params.nEstatus},
                 '${params.cMotivoCancelacion}'
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
            error: 'Error al actualizar el estatus de la compra.',
            data: [],
        };
    }
}
module.exports = {
    obtenerCompras,
    guardarCompra,
    cancelarCompra,
    obtenerConsultaCompras,
    confirmarCompra,
    actualizarEstatusCompra
};