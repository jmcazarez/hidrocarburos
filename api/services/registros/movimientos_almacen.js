
const { QueryTypes } = require("sequelize");
const sequelize = require('../../db/config');

async function obtenerMovimientoAlmacen(params) {

    try {
        console.log('entro',params);
        let data = await sequelize.query(
            `
             CALL proc_obtener_movimientos_almacen(${params.nMovimientoAlmacen})
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
            error: 'Error al obtener el movimiento de almacen.',
            data: [],
        };
    }
}



async function guardarMovimientoAlmacen(params) {
    const t = await sequelize.transaction();
    try {
        let nMovimientoAlmacen = 0;
        console.log(params)
        let data = await sequelize.query(
            `
             CALL proc_registra_movimiento_de_inventario (
                ${params.nTipoMovimiento},
                ${params.nAlmacenRegistro},
                ${params.nAlmacenMovimiento},
                '${params.dFechaMovimiento}',
                '${params.cLogin}',
                '${params.cReferencia}',
                @rank
            )
             `,
            {
                type: QueryTypes.INSERT
            }
        );

        await params.detalle.forEach(async detalle => {
            let det = await sequelize.query(
                `
                 CALL proc_registra_movimiento_de_inventario_detalle (
                    ${data[0].ID},
                    ${detalle.nTipoMovimiento},
                    ${detalle.nRenglon},
                    ${detalle.nArticulo},
                    ${detalle.nCantidadMovimiento},
                    ${detalle.nCosto},
                    ${detalle.nPrecio}
                )
                 `,
                {
                    type: QueryTypes.INSERT
                }
            );
        });



        await t.commit();
        return {
            status: 200,
            error: '',
            data: data[0],
        }

    } catch (err) {
        // do something
        await t.rollback();
        console.log('err',err);
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