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
    await this.service.obtenerCompras(0).subscribe((resp: any) => {
      for (const compra of resp.data) {
        let nCostoxLitro = 0;
        if (compra.nLitrosCompra > 0 && compra.nCostoTotal > 0) {
          nCostoxLitro = compra.nCostoTotal / compra.nLitrosCompra
        }
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
          cArticulo: compra.cArticulo,
          nEstatusOriginal :  compra.nEstatus
        })
      }

      this.dataTemp = [...comprasTemp];
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
    this.data = this.dataTemp;
    if (value.target.value === '') {
      this.data = this.dataTemp;
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
        || String(d.nCostoTotal).toLowerCase().indexOf(val) !== - 1
        || String(d.nLitrosRecibidos).toLowerCase().indexOf(val) !== - 1
        || d.cArticulo.toLowerCase().indexOf(val) !== - 1
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
          }  else {
            row.nEstatus = row.nEstatusOriginal;
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
        } else {
          row.nEstatus = row.nEstatusOriginal;
        }
      });
    } else {
      this.util.dialogConfirm('¿Está seguro que desea actualizar la compra?').then(async (result) => {
        if (result.isConfirmed) {
          await this.service.actualizarEstatusCompra({
            nCompra: row.nCompra,
            nEstatus: row.nEstatus,
          }).subscribe(async (resp: any) => {
            if (resp) {
            }
          }, (error: any) => {
            this.util.dialogError('Error al actualizar la compra.');
          });
        }  else {
          row.nEstatus = row.nEstatusOriginal;          
        }
      });
    }
    this.filerWithStatus();
  }

  changeStatus(nEstatus: any, event: any) {
    this.filerWithStatus();
  }

  filerWithStatus(){
    let arraFiltrado: any = [];
    for (const key of this.estatus) {
      if (key.status) {
        let lea: any = this.dataTemp.filter((d) => {    
         return String(d.nEstatus).toLowerCase().indexOf(String(key.nEstatus)) !== - 1    
        });
        arraFiltrado = [ ...arraFiltrado, ...lea];
      }
    }
    this.data = arraFiltrado;
  }
}
