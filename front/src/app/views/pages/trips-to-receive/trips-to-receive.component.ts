import { Component, OnInit } from '@angular/core';
import { ComprasService } from 'src/services/compras.service';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmacionRecepcionPedidosComponent } from './confirmacion-recepcion-pedidos/confirmacion-recepcion-pedidos.component';
import { UtilsService } from 'src/services/utils.service';
import { CancelacionRecepcionPedidosComponent } from './cancelacion-recepcion-pedidos/cancelacion-recepcion-pedidos.component';
import * as dayjs from 'dayjs';


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
  estatus = [
    {
      nEstatus: 1,
      cEstatus: 'En Tránsito',
      status: true
    },
    {
      nEstatus: 2,
      cEstatus: 'En Aduana',
      status: true
    },
    {
      nEstatus: 3,
      cEstatus: 'Recibido',
      status: false
    },
    {
      nEstatus: 4,
      cEstatus: 'Cancelado',
      status: false
    }
  ]
  constructor(private service: ComprasService, private datePipe: DatePipe, public modalService: NgbModal,
    private util: UtilsService,) { }
  async ngOnInit(): Promise<void> {
    await this.obtenerCatalogosFletera();
  }



  async obtenerCatalogosFletera() {
    const comprasTemp: any[] = [];
    let cFechaRecepcion = '';
    await this.service.obtenerCompras(0).subscribe((resp: any) => {
      for (const compra of resp.data) {
        let nCostoxLitro = 0;
        if (compra.nLitrosCompra > 0 && compra.nCostoTotal > 0) {
          nCostoxLitro = compra.nCostoTotal / compra.nLitrosCompra
        }
        console.log(resp);
        if (!compra.dFechaRecepcion) {
          compra.dFechaRecepcion = '';

        } else {

          compra.dFechaRecepcion = dayjs(new Date(compra.dFechaRecepcion).toISOString().split('T')[0]).format('DD/MM/YYYY')
        }
        if (!compra.dFechaCompra) {
          compra.dFechaCompra = '';
          compra.dFechaCompraOrigen = '';
        } else {
          compra.dFechaCompraOrigen = compra.dFechaCompra;
          compra.dFechaCompra = dayjs(new Date(compra.dFechaCompra).toISOString().split('T')[0]).format('DD/MM/YYYY')

        }


        if (!compra.cMotivoCancelacion) {
          compra.cMotivoCancelacion = '';
        }

        if (!compra.cFactura) {
          compra.cFactura = '';
        }
        console.log(compra.dFechaCompra);
        comprasTemp.push({
          nCompra: compra.nCompra,
          cTipoCompraLarga: compra.cTipoCompraLarga,
          cEmpresa: compra.cEmpresa,
          cAlmacen: compra.cAlmacen,
          cProveedor: compra.cProveedor,
          cFactura: compra.cFactura,
          nlitrosComprados:  parseFloat(compra.nLitrosCompra).toFixed(2),
          nCostoxLitro: nCostoxLitro,
          dFechaCompra: compra.dFechaCompra,
          nCostoTotal: compra.nCostoTotal,
          nLitrosRecibidos: compra.nLitrosRecepcion,
          nEstatus: compra.nEstatus,
          cArticulo: compra.cArticulo,
          nEstatusOriginal: compra.nEstatus,
          dFechaRecepcion: compra.dFechaRecepcion,
          cMotivoCancelacion: compra.cMotivoCancelacion,
          dFechaCompraOrigen: compra.dFechaCompraOrigen
        })
      }


      this.dataTemp = [...comprasTemp];
      console.log(this.dataTemp);
      const temp = this.dataTemp.filter((d) =>
        String(d.nEstatus).toLowerCase().indexOf('1') !== - 1
        || String(d.nEstatus).toLowerCase().indexOf('2') !== - 1
      );
      this.data = [...temp];
      /*  this.datePipe.transform(vigencia, 'dd-MM-yyyy'), */
    });
  }
  filterDatatable(value: any): void {
    // Filtramos tabla
    let arraFiltrado: any = [];
    for (const key of this.estatus) {
      if (key.status) {
        let lea: any = this.dataTemp.filter((d) => {
          return String(d.nEstatus).toLowerCase().indexOf(String(key.nEstatus)) !== - 1
        });
        arraFiltrado = [...arraFiltrado, ...lea];
      }
    }
    this.data = arraFiltrado;
    if (value.target.value === '') {
      this.data = arraFiltrado;
    } else {
      const val = value.target.value.toLowerCase();
      const temp = this.data.filter((d) =>
        d.cTipoCompraLarga.toLowerCase().indexOf(val) !== - 1
        || d.cEmpresa.toLowerCase().indexOf(val) !== - 1
        || d.cAlmacen.toLowerCase().indexOf(val) !== - 1
        || d.cProveedor.toLowerCase().indexOf(val) !== - 1
        || d.cFactura.toLowerCase().indexOf(val) !== - 1
        || d.nlitrosComprados.toLowerCase().indexOf(val) !== - 1
        || String(d.nCostoxLitro).toLowerCase().indexOf(val) !== - 1
        || d.dFechaCompra.toLowerCase().indexOf(val) !== - 1
        || d.dFechaRecepcion.toLowerCase().indexOf(val) !== - 1
        || String(d.nCostoTotal).toLowerCase().indexOf(val) !== - 1
        || String(d.nLitrosRecibidos).toLowerCase().indexOf(val) !== - 1
        || d.cArticulo.toLowerCase().indexOf(val) !== - 1
        || d.cMotivoCancelacion.toLowerCase().indexOf(val) !== - 1
      );
      this.data = temp;

    }
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
          if (value.nEstatus) {
            row = value;
            row.nEstatusOriginal = value.nEstatus;
          } else {
            row.nEstatus = row.nEstatusOriginal;
          }
          this.filerWithStatus();
          // this.enfocarBotonNuevaVenta()
        }
      );
    } else if (row.nEstatus == 4) {
      const modalRef = this.modalService.open(CancelacionRecepcionPedidosComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false,
        modalDialogClass: 'dialog-formulario-mediano',
      });
      modalRef.componentInstance.compra = row;
      modalRef.closed.subscribe(
        value => {
          if (value.nEstatus) {
            row = value;
            row.nEstatusOriginal = value.nEstatus;
          } else {
            row.nEstatus = row.nEstatusOriginal;
          }
          this.filerWithStatus();
          // this.enfocarBotonNuevaVenta()
        }
      );
    } else {
      this.util.dialogConfirm('¿Está seguro que desea actualizar el estatus de la compra?').then(async (result) => {
        if (result.isConfirmed) {
          await this.service.actualizarEstatusCompra({
            nCompra: row.nCompra,
            nEstatus: row.nEstatus,
            cMotivoCancelacion: ''
          }).subscribe(async (resp: any) => {
            if (resp) {
              row.nEstatusOriginal = row.nEstatus;
              this.filerWithStatus();
            }
          }, (error: any) => {
            this.util.dialogError('Error al actualizar el estatus de la compra.');
          });
        } else {
          row.nEstatus = row.nEstatusOriginal;
          this.filerWithStatus();
        }
      });
    }
  }

  changeStatus(nEstatus: any, event: any) {
    this.filerWithStatus();
  }

  filerWithStatus() {
    let arraFiltrado: any = [];
    for (const key of this.estatus) {
      if (key.status) {
        let lea: any = this.dataTemp.filter((d) => {
          return String(d.nEstatus).toLowerCase().indexOf(String(key.nEstatus)) !== - 1
        });
        arraFiltrado = [...arraFiltrado, ...lea];
      }
    }
    this.data = arraFiltrado;
  }
}
