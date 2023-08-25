import { Component, OnInit } from '@angular/core';
import { ComprasService } from 'src/services/compras.service';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmacionRecepcionPedidosComponent } from './confirmacion-recepcion-pedidos/confirmacion-recepcion-pedidos.component';
import { UtilsService } from 'src/services/utils.service';
import { CambioEstatusRecepcionPedidosComponent } from './cambio-estatus-recepcion-pedidos/cambio-estatus-recepcion-pedidoscomponent';
import * as dayjs from 'dayjs';
import { BusquedaModalComponent } from '../busquedas/busqueda-modal/busqueda-modal.component';
import { ProveedorService } from 'src/services/proveedor.service';
import { ArticulosService } from 'src/services/articulos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';



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
      nEstatus: 5,
      cEstatus: 'Parcial',
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
  form: FormGroup;
  constructor(private service: ComprasService, private datePipe: DatePipe, public modalService: NgbModal,
    private util: UtilsService,
    private serviceProveedor: ProveedorService,
    private serviceArticulo: ArticulosService,
    private spinner: NgxSpinnerService,) { }
  async ngOnInit(): Promise<void> {
    this.form = new FormGroup({

      nProveedor: new FormControl('', Validators.required),
      cProveedor: new FormControl({ value: '', disabled: true }, []),
      nArticulo: new FormControl('', Validators.required),
      cArticulo: new FormControl({ value: '', disabled: true }, []),
      nLitrosRecibidos: new FormControl(0.00, []),
      cFuller: new FormControl('', Validators.required),
      bNacional: new FormControl(1, []),
    });

    await this.obtenerCompras();


  }

  get nProveedor(): number {
    if (!this.form.get('nProveedor')?.value || this.form.get('nProveedor')?.value == '') {
      return 0;
    }
    return this.form.get('nProveedor')?.value;
  }
  get cProveedor(): string {

    return this.form.get('cProveedor')?.value ?? '';
  }
  get nArticulo(): number {
    if (!this.form.get('nArticulo')?.value || this.form.get('nArticulo')?.value == '') {
      return 0;
    }
    return this.form.get('nArticulo')?.value;
  }
  get cArticulo(): string {

    return this.form.get('cArticulo')?.value ?? '';
  }

  get nLitrosRecibidos(): number {

    return this.form.get('nLitrosRecibidos')?.value ?? 0;
  }

  get cFuller(): string {

    return this.form.get('cFuller')?.value ?? '';
  }

  get bNacional(): number {

    return this.form.get('bNacional')?.value ?? 1;
  }


  async obtenerCompras() {
    const comprasTemp: any[] = [];
    let cFechaRecepcion = '';
    this.spinner.show();
    await this.service.obtenerCompras(0).subscribe((resp: any) => {
      for (const compra of resp.data) {
        let nCostoxLitro = 0;
        compra.dFechaCompra = compra.dFechaCompra.replace('T00:00:00.000Z', 'T06:00:00.000Z')
        let dFechaCompraDate = new Date(compra.dFechaCompra);

        if (compra.nLitrosCompra > 0 && compra.nCostoTotal > 0) {
          nCostoxLitro = compra.nCostoTotal / compra.nLitrosCompra
        }

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
        if ((Number(compra.nLitrosCompra) - Number(compra.nLitrosRecepcion)) == 0) {
          compra.nEstatus = 3;
        }


        comprasTemp.push({
          nCompra: compra.nCompra,
          cTipoCompraLarga: compra.cTipoCompraLarga,
          cEmpresa: compra.cEmpresa,
          cAlmacen: compra.cAlmacen,
          cProveedor: compra.cProveedor,
          cFactura: compra.cFactura,
          nlitrosComprados: parseFloat(compra.nLitrosCompra).toFixed(4),
          nCostoxLitro: nCostoxLitro,
          dFechaCompra: compra.dFechaCompra,
          nCostoTotal: compra.nCostoTotal,
          nLitrosRecibidos: Number(compra.nLitrosRecepcion),
          nEstatus: compra.nEstatus,
          cArticulo: compra.cArticulo,
          nEstatusOriginal: compra.nEstatus,
          dFechaRecepcion: compra.dFechaRecepcion,
          cMotivoCancelacion: compra.cMotivoCancelacion,
          dFechaCompraOrigen: compra.dFechaCompraOrigen,
          nLitrosPendientes: (Number(compra.nLitrosCompra) - Number(compra.nLitrosRecepcion)),
          bRecibir: 0,
          dFechaCompraDate
        })
      }

      this.dataTemp = [...comprasTemp];
      const temp = this.dataTemp.filter((d) =>
        String(d.nEstatus).toLowerCase().indexOf('1') !== - 1
        || String(d.nEstatus).toLowerCase().indexOf('2') !== - 1
        || String(d.nEstatus).toLowerCase().indexOf('5') !== - 1
      );
      this.data = [...temp];
      console.log(this.data);
      this.spinner.hide();
      /*  this.datePipe.transform(vigencia, 'dd-MM-yyyy'), */
    });
  }
  filterDatatable(value: any): void {
    // Filtramos tabla
    let arraFiltrado: any = [];
    let temporal = [];
    for (const key of this.estatus) {
      if (key.status) {
        let lea: any = this.dataTemp.filter((d) => {
          return String(d.nEstatus).toLowerCase().indexOf(String(key.nEstatus)) !== - 1
        });
        arraFiltrado = [...arraFiltrado, ...lea];
      }
    }
    this.data = arraFiltrado;
    if (this.cProveedor.toLowerCase() !== '' && this.cArticulo.toLowerCase() !== '') {
      temporal = this.data.filter((d) =>
        d.cProveedor.toLowerCase().indexOf(this.cProveedor.toLowerCase()) !== - 1
        && d.cArticulo.toLowerCase().indexOf(this.cArticulo.toLowerCase()) !== - 1
      );
    } else if (this.cProveedor.toLowerCase() !== '' && this.cArticulo.toLowerCase() === '') {
      temporal = this.data.filter((d) =>
        d.cProveedor.toLowerCase().indexOf(this.cProveedor.toLowerCase()) !== - 1
      );
    } else if (this.cProveedor.toLowerCase() === '' && this.cArticulo.toLowerCase() !== '') {
      temporal = this.data.filter((d) =>
        d.cArticulo.toLowerCase().indexOf(this.cArticulo.toLowerCase()) !== - 1
      );
    } else {
      temporal = this.dataTemp;
    }
    this.data = temporal;
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

  filterDatatableProveedorArticulo(): void {
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
    let temporal = [];
    this.data = arraFiltrado;

    if (this.cProveedor.toLowerCase() !== '' && this.cArticulo.toLowerCase() !== '') {
      temporal = this.data.filter((d) =>
        d.cProveedor.toLowerCase().indexOf(this.cProveedor.toLowerCase()) !== - 1
        && d.cArticulo.toLowerCase().indexOf(this.cArticulo.toLowerCase()) !== - 1
      );
    } else if (this.cProveedor.toLowerCase() !== '' && this.cArticulo.toLowerCase() === '') {
      temporal = this.data.filter((d) =>
        d.cProveedor.toLowerCase().indexOf(this.cProveedor.toLowerCase()) !== - 1
      );
    } else if (this.cProveedor.toLowerCase() === '' && this.cArticulo.toLowerCase() !== '') {
      temporal = this.data.filter((d) =>
        d.cArticulo.toLowerCase().indexOf(this.cArticulo.toLowerCase()) !== - 1
      );
    } else {
      temporal = this.dataTemp;
    }
    this.data = temporal;
  }
  async onChange(row: any) {
    if (row.nEstatus == 3) {
      const modalRef = this.modalService.open(ConfirmacionRecepcionPedidosComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false,
        modalDialogClass: 'dialog-formulario-mediano',
      });
      let compraTemp = row;

      compraTemp.cFuller = ''
      modalRef.componentInstance.compra = compraTemp;
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
      const modalRef = this.modalService.open(CambioEstatusRecepcionPedidosComponent, {
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
            row.cMotivoCancelacion = value.cMotivoCancelacion;
          } else {
            row.nEstatus = row.nEstatusOriginal;
          }
          this.filerWithStatus();
          // this.enfocarBotonNuevaVenta()
        }
      );
      /*  } else {
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
         }); */
    }
  }

  changeStatus(nEstatus: any, event: any) {
    this.filerWithStatus();
  }

  filerWithStatus() {
    let arraFiltrado: any = [];
    let temporal = [];

    if (this.cProveedor.toLowerCase() !== '' && this.cArticulo.toLowerCase() !== '') {
      temporal = this.dataTemp.filter((d) =>
        d.cProveedor.toLowerCase().indexOf(this.cProveedor.toLowerCase()) !== - 1
        && d.cArticulo.toLowerCase().indexOf(this.cArticulo.toLowerCase()) !== - 1
      );
    } else if (this.cProveedor.toLowerCase() !== '' && this.cArticulo.toLowerCase() === '') {
      temporal = this.dataTemp.filter((d) =>
        d.cProveedor.toLowerCase().indexOf(this.cProveedor.toLowerCase()) !== - 1
      );
    } else if (this.cProveedor.toLowerCase() === '' && this.cArticulo.toLowerCase() !== '') {
      temporal = this.dataTemp.filter((d) =>
        d.cArticulo.toLowerCase().indexOf(this.cArticulo.toLowerCase()) !== - 1
      );
    } else {
      temporal = this.dataTemp;
    }

    for (const key of this.estatus) {
      if (key.status) {
        let lea: any = temporal.filter((d) => {
          return String(d.nEstatus).toLowerCase().indexOf(String(key.nEstatus)) !== - 1
        });
        arraFiltrado = [...arraFiltrado, ...lea];
      }
    }
    this.data = arraFiltrado;
  }

  async openModalArticulos() {
    const modalRef = this.modalService.open(BusquedaModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'dialog-formulario-chico',
    });

    modalRef.componentInstance.titulo = 'Búsqueda de artículos';

    modalRef.componentInstance.props = [{
      cNombre: 'Folio',
      cPropiedad: 'nArticulo'
    },
    {
      cNombre: 'Artículo',
      cPropiedad: 'cDescripcion'
    }
    ];

    const articuloResp = await this.serviceArticulo.obtenerArticulos(0, this.bNacional).toPromise();

    const data = articuloResp.data.map((item: any) => { return { nArticulo: item.nArticulo, cDescripcion: item.cDescripcionLarga } });

    modalRef.componentInstance.data = data;
    modalRef.componentInstance.dataTemp = data;

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if (value && value.id) {
          this.asignarArticulo(value);
          modalRef.close();
        }
      }
    );
  }

  async openModalProveedores() {
    const modalRef = this.modalService.open(BusquedaModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'dialog-formulario-chico',
    });

    modalRef.componentInstance.titulo = 'Búsqueda de proveedores';

    modalRef.componentInstance.props = [{
      cNombre: 'Folio',
      cPropiedad: 'nProveedor'
    },
    {
      cNombre: 'Proveedor',
      cPropiedad: 'cDescripcion'
    }
    ];

    const proveedorResp = await this.serviceProveedor.obtenerProveedores(0, -1).toPromise();


    const data = proveedorResp.data.map((item: any) => { return { nProveedor: item.nProveedor, cDescripcion: item.cNombreProveedor } });

    modalRef.componentInstance.data = data;
    modalRef.componentInstance.dataTemp = data;

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if (value && value.id) {
          this.asignarProveedor(value);
          modalRef.close();
        }
      }
    );

  }
  async asignarProveedor(value: any) {
    const proveedorResp = await this.serviceProveedor.obtenerProveedores(value.id, -1).toPromise();
    this.form.controls["cProveedor"].setValue(value.cDescripcion);
    this.form.controls["nProveedor"].setValue(value.id);
    this.form.controls["bNacional"].setValue(proveedorResp.data[0].bNacional);
    this.filterDatatableProveedorArticulo();

  }

  asignarArticulo(value: any) {
    this.form.controls["cArticulo"].setValue(value.cDescripcion);
    this.form.controls["nArticulo"].setValue(value.id);
    this.filterDatatableProveedorArticulo();
  }

  guardar(): void {
    try {
      let compras = this.data.filter(
        (d) =>
          d.bRecibir === true
      )

      if (compras.length > 1) {
        this.util.dialogWarning('No se puede recibir mas de un viaje a la vez.');
        throw ''
      }

      const sum = compras.reduce((accumulator, object) => {
        return accumulator + Number(object.nLitrosPendientes).toFixed(2);
      }, 0);



      if (sum < Number(this.nLitrosRecibidos)) {
        this.util.dialogWarning('La cantidad de litros recibidos no puede ser mayor a los litros pendientes por recibir.');

      } else {

        if (compras.length === 0) {
          this.util.dialogWarning('Es necesario seleccionar almenos un pedido para realizar la recepción.');
        } else {

          compras = compras.sort((a, b) => a.dFechaCompraDate.getTime() - b.dFechaCompraDate.getTime() || b.nLitrosRecibidos - a.nLitrosRecibidos)
          const modalRef = this.modalService.open(ConfirmacionRecepcionPedidosComponent, {
            centered: true,
            backdrop: 'static',
            keyboard: false,
            modalDialogClass: 'dialog-formulario-grande',
          });
          modalRef.componentInstance.compra = {
            nlitrosComprados: this.nLitrosRecibidos,
            dFechaCompraOrigen: compras[0].dFechaCompraOrigen,
            cFuller: this.cFuller
          }

          let litrosPorRecibirTemp = this.nLitrosRecibidos
          let comprasTemp: any = [];
          let litrosCompradosOrigen = 0;
          compras.forEach(element => {
            let litrosPendientes = 0;
            litrosPendientes = element.nLitrosPendientes;

            if (litrosPorRecibirTemp < litrosPendientes) {
              litrosPendientes = litrosPendientes - litrosPorRecibirTemp
              litrosPorRecibirTemp = 0;
            } else {
              litrosPorRecibirTemp = litrosPorRecibirTemp - litrosPendientes;
              litrosPendientes = 0;
            }
            litrosCompradosOrigen = litrosCompradosOrigen + Number(element.nlitrosComprados)
            comprasTemp.push({
              nCompra: element.nCompra,
              cTipoCompraLarga: element.cTipoCompraLarga,
              cEmpresa: element.cEmpresa,
              cAlmacen: element.cAlmacen,
              cProveedor: element.cProveedor,
              cFactura: element.cFactura,
              nlitrosComprados: Number(element.nlitrosComprados),
              nCostoxLitro: element.nCostoxLitro,
              dFechaCompra: element.dFechaCompra,
              nCostoTotal: element.nCostoTotal,
              nLitrosRecibidos: element.nLitrosRecepcion,
              nEstatus: element.nEstatus,
              cArticulo: element.cArticulo,
              nEstatusOriginal: element.nEstatus,
              dFechaRecepcion: element.dFechaRecepcion,
              cMotivoCancelacion: element.cMotivoCancelacion,
              dFechaCompraOrigen: element.dFechaCompraOrigen,
              nLitrosPendientes: element.nLitrosPendientes,
              nLitrosRestantes: Number(litrosPendientes),
              bRecibir: 1
            })
          });

          modalRef.componentInstance.compra = {
            nlitrosComprados: litrosCompradosOrigen,
            nLitrosARecibir: this.nLitrosRecibidos,
            dFechaCompraOrigen: compras[0].dFechaCompraOrigen,
            cFuller: this.cFuller
          }


          console.log('compras', comprasTemp)
          modalRef.componentInstance.compras = comprasTemp;
          modalRef.closed.subscribe(
            async value => {
              if (value.length > 0) {
                this.form.controls["nLitrosRecibidos"].setValue(0);
                this.form.controls["cFuller"].setValue('');
                this.limpiar();
                this.filterDatatableProveedorArticulo();
              }
              /*  if (value.nEstatus) {
                 row = value;
                 row.nEstatusOriginal = value.nEstatus;
               } else {
                 row.nEstatus = row.nEstatusOriginal;
               }
               this.filerWithStatus(); */
              // this.enfocarBotonNuevaVenta()
            }
          );
        }
      }

    } catch (err) {

    }

  }

  async limpiar() {
    this.form.reset();
    await this.obtenerCompras();
    this.data = this.dataTemp;

    this.estatus = [
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
        nEstatus: 5,
        cEstatus: 'Parcial',
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
  }
}
