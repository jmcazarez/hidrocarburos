
const { QueryTypes } = require("sequelize");
const sequelize = require('../../db/config');

async function obtenerMovimientoAlmacen(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_obtener_movimientos_almacen(${params.nMovimientoAlmacen})
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
            error: 'Error al obtener el movimiento de almacen.',
            data: [],
        };
    }
}



async function guardarMovimientoAlmacen(params) {
    const t = await sequelize.transaction();
    try {
 
        let data = await sequelize.query(
            `
             CALL proc_registra_movimiento_de_inventario (
                ${params.nTipoMovimiento},
                ${params.nAlmacenRegistro},
                ${params.nAlmacenMovimiento},
                ${params.dFechaMovimiento},
                '${params.cUsuario}',
                '${params.cReferencia}'
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
                error: 'Error al guardar el movimiento de almacen.',
                data: [],
            };
        }

    }
}

module.exports = {
    obtenerMovimientoAlmacen,
    guardarMovimientoAlmacen,

};