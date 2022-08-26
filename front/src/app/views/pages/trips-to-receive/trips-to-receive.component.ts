import { Component, OnInit } from '@angular/core';
import { ComprasService } from 'src/services/compras.service';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmacionRecepcionPedidosComponent } from './confirmacion-recepcion-pedidos/confirmacion-recepcion-pedidos.component';
import { UtilsService } from 'src/services/utils.service';

@Component({
  selector: 'app-trips-to-receive',
  templateUrl: './trips-to-receive.component.html',
  styleUrls: ['./trips-to-receive.component.scss'],
  preserveWhitespaces: true,
  providers: [DatePipe]
})
export class TripsToReceiveComponent implements OnInit {
  valueBuscador = '';
  reorderable = false;
  loadingIndicator = false;
  data: any[] = [];
  dataTemp: any[] = [];
  constructor(private service: ComprasService, private datePipe: DatePipe, public modalService: NgbModal,

    private util: UtilsService,) { }

  async ngOnInit(): Promise<void> {
    await this.obtenerCatalogosFletera();
  }

  filterDatatable(filtro: any) { }

  obtenerCatalogosFletera() {
    const comprasTemp: any[] = [];
    this.service.obtenerCompras(0).subscribe((resp: any) => {


      for (const compra of resp.data) {
        let nCostoxLitro = 0;
        if (compra.nLitrosCompra > 0 && compra.nCostoTotal > 0) {
          nCostoxLitro = compra.nCostoTotal / compra.nLitrosCompra
        }
        console.log(compra);
        comprasTemp.push({
          nCompra: compra.nCompra,
          cTipoCompraLarga: compra.cTipoCompraLarga,
          cEmpresa: compra.cEmpresa,
          cAlmacen: compra.cAlmacen,
          cProveedor: compra.cProveedor,
          cFactura: compra.cFactura,
          nlitrosComprados: compra.nLitrosCompra,
          nCostoxLitro: nCostoxLitro,
          dFechaCompra: compra.dFechaCompra,
          nCostoTotal: compra.nCostoTotal,
          nLitrosRecibidos: compra.nLitrosRecepcion,
          nEstatus: compra.nEstatus,
          cArticulo: compra.cArticulo
        })


      }

      this.data = [...comprasTemp];
      this.dataTemp = [...comprasTemp];
      /*  this.datePipe.transform(vigencia, 'dd-MM-yyyy'), */
    });
  }
  async onChange(row: any) {
    if (row.nEstatus == 3) {

      const modalRef = this.modalService.open(ConfirmacionRecepcionPedidosComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false,
        modalDialogClass: 'dialog-formulario-chico',

      });

      modalRef.componentInstance.compra = row;

      modalRef.closed.subscribe(
        value => {
          if (value) {
            row = value;
          }
          // this.enfocarBotonNuevaVenta()

        }
      );
    } else if (row.nEstatus == 4) {
      this.util.dialogConfirm('¿Está seguro que desea cancelar esta compra?').then(async (result) => {
        if (result.isConfirmed) {
          row.nEstatus = 4
          await this.service.actualizarEstatusCompra({
            nCompra: row.nCompra,
            nEstatus: row.nEstatus,
          }).subscribe(async (resp: any) => {
            if (resp) {
            }
          }, (error: any) => {
            this.util.dialogError('Error al actualizar la compra.');
          });
        }
      });
    } else {
      await this.service.actualizarEstatusCompra({
        nCompra: row.nCompra,
        nEstatus: row.nEstatus,
      }).subscribe(async (resp: any) => {
        if (resp) {
        }
      }, (error: any) => {
        this.util.dialogError('Error al actualizar la compra.');
      });
    }

  }
}
