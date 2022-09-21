
const { QueryTypes } = require("sequelize");
const sequelize = require('../../db/config');

async function obtenerMovimientoAlmacen(params) {

    try {
        console.log('entro', params);
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
        console.log(`
      CALL proc_registra_movimiento_de_inventario (
         ${params.nTipoMovimiento},
         ${params.nAlmacenRegistro},
         ${params.nAlmacenMovimiento},
         '${params.dFechaMovimiento}',
         '${params.cLogin}',
         '${params.cReferencia}',
         @rank,
         @contraMovimiento
     )
      `);
        let data = await sequelize.query(
            `
             CALL proc_registra_movimiento_de_inventario (
                ${params.nTipoMovimiento},
                ${params.nAlmacenRegistro},
                ${params.nAlmacenMovimiento},
                '${params.dFechaMovimiento}',
                '${params.cLogin}',
                '${params.cReferencia}',
                @rank,
                @contraMovimiento
            )
             `,
            {
                type: QueryTypes.INSERT,
                transaction: t
            }
        ).then((res) => {
            if (res.length === 0) {
                return null;
            }
            return res;
        }).catch(async (error) => {
            await t.rollback();
            throw error;
        });


        if (data[0]) {
            await sequelize.query(
                `
             CALL proc_registra_movimiento_de_inventario_detalle (
                ${data[0].ID},
                ${data[0].nTipoMovimiento},
                ${params.detalle[0].nRenglon},
                ${params.detalle[0].nArticulo},
                ${params.detalle[0].nCantidadMovimiento},
                ${params.detalle[0].nCosto},
                ${params.detalle[0].nPrecio}
            )
             `,
                {
                    type: QueryTypes.INSERT,
                    transaction: t
                }
            ).then((res) => {
                if (res.length === 0) {
                    return null;
                }
                return res;
            }).catch(async (error) => {
                throw error;
            });

            let aplica = await sequelize.query(
                `
                 CALL proc_aplica_movimiento_almacen (
                    ${data[0].ID}
                )
                 `,
                {
                    type: QueryTypes.INSERT,
                    transaction: t
                }
            ).then((res) => {

                return res;
            }).catch(async (error) => {
                throw error;
            });
        }

        if (data[0].IDContraMovimiento) {
        
            await sequelize.query(
                `
             CALL proc_registra_movimiento_de_inventario_detalle (
                ${data[0].IDContraMovimiento},
                ${data[0].nContraTipoMovimiento},
                ${params.detalle[0].nRenglon},
                ${params.detalle[0].nArticulo},
                ${params.detalle[0].nCantidadMovimiento},
                ${params.detalle[0].nCosto},
                ${params.detalle[0].nPrecio}
            )
             `,
                {
                    type: QueryTypes.INSERT,
                    transaction: t
                }
            ).then((res) => {
                if (res.length === 0) {
                    return null;
                }
                return res;
            }).catch(async (error) => {
                throw error;
            });

            let aplica = await sequelize.query(
                `
                 CALL proc_aplica_movimiento_almacen (
                    ${data[0].IDContraMovimiento}
                )
                 `,
                {
                    type: QueryTypes.INSERT,
                    transaction: t
                }
            ).then((res) => {

                return res;
            }).catch(async (error) => {
                throw error;
            });
        }



        await t.commit();
        return {
            status: 200,
            error: '',
            data: data,
        }

    } catch (err) {
        t.rollback();
        // do something
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
async function aplicarMovimientoAlmacen(params) {
    const t = await sequelize.transaction();
    try {
        console.log(params);
        let aplica = await sequelize.query(
            `
             CALL proc_aplica_movimiento_almacen (
                ${params.ID}
            )
             `,
            {
                type: QueryTypes.INSERT,
                transaction: t
            }
        ).then((res) => {

            return res;
        }).catch(async (error) => {
            await t.rollback();
            throw error;
        });


        console.log(aplica);
        await t.commit();
        return {
            status: 200,
            error: '',
            data: aplica,
        }

    } catch (err) {

        console.log('err', err);
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
    aplicarMovimientoAlmacen

};