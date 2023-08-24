import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlmacenService } from 'src/services/almacen.service';
import { ArticulosService } from 'src/services/articulos.service';
import { ComprasService } from 'src/services/compras.service';
import { EmpresaService } from 'src/services/empresa.service';
import { ProveedorService } from 'src/services/proveedor.service';
import { UtilsService } from 'src/services/utils.service';
import { Patterns } from 'src/utils/patterns';
import { BusquedaModalComponent } from '../busquedas/busqueda-modal/busqueda-modal.component';
import * as dayjs from 'dayjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-purchase-consultation',
  templateUrl: './purchase-consultation.component.html',
  styleUrls: ['./purchase-consultation.component.scss'],
  preserveWhitespaces: true
})
export class PurchaseConsultationComponent implements OnInit {

  form: FormGroup;
  compras = [] as any;

  constructor(
    private service: ComprasService,
    private util: UtilsService,
    public modalService: NgbModal,
    private patterns: Patterns,
    private serviceEmpresa: EmpresaService,
    private serviceAlmacen: AlmacenService,
    private serviceProveedor: ProveedorService,
    private serviceArticulo: ArticulosService,
    private spinner: NgxSpinnerService
  ) { }

  async ngOnInit(): Promise<void> {
    this.form = new FormGroup({
      nCompra: new FormControl('', []),
      cTipoCompra: new FormControl('', []),
      cEmpresa: new FormControl({ value: '', disabled: true }, []),
      nEmpresa: new FormControl('', []),
      nAlmacen: new FormControl('', []),
      cAlmacen: new FormControl({ value: '', disabled: true }, []),
      nProveedor: new FormControl('', Validators.required),
      cProveedor: new FormControl({ value: '', disabled: true }, []),
      nArticulo: new FormControl('', Validators.required),
      cArticulo: new FormControl({ value: '', disabled: true }, []),
      dFechaInicio: new FormControl('', []),
      dFechaFin: new FormControl('', []),
    });
  }

  get nCompra(): number {
    if (!this.form.get('nCompra')?.value || this.form.get('nCompra')?.value == '') {
      return 0;
    }
    return this.form.get('nCompra')?.value;
  }

  get cTipoCompra(): string {
    return this.form.get('cTipoCompra')?.value ?? '';
  }

  get nEmpresa(): number {
    if (!this.form.get('nEmpresa')?.value || this.form.get('nEmpresa')?.value == '') {
      return 0;
    }
    return this.form.get('nEmpresa')?.value;
  }

  get nAlmacen(): number {
    if (!this.form.get('nAlmacen')?.value || this.form.get('nAlmacen')?.value == '') {
      return 0;
    }
    return this.form.get('nAlmacen')?.value;
  }

  get nProveedor(): number {
    if (!this.form.get('nProveedor')?.value || this.form.get('nProveedor')?.value == '') {
      return 0;
    }
    return this.form.get('nProveedor')?.value;
  }

  get dFechaInicio(): any {
    return this.form.get('dFechaInicio')?.value;
  }

  get dFechaFin(): any {
    return this.form.get('dFechaFin')?.value;
  }

  get nArticulo(): number {
    if (!this.form.get('nArticulo')?.value || this.form.get('nArticulo')?.value == '') {
      return 0;
    }
    return this.form.get('nArticulo')?.value;
  }


  async openModalEmpresas() {
    const modalRef = this.modalService.open(BusquedaModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'dialog-formulario-chico',
    });

    modalRef.componentInstance.titulo = 'Búsqueda de empresas';

    modalRef.componentInstance.props = [{
      cNombre: 'Folio',
      cPropiedad: 'nEmpresa'
    },
    {
      cNombre: 'Empresa',
      cPropiedad: 'cNombreEmpresa'
    }
    ];

    const empresasResp = await this.serviceEmpresa.obtenerEmpresas(0).toPromise();

    const data = empresasResp.data.map((item: any) => { return { nEmpresa: item.nEmpresa, cNombreEmpresa: item.cNombreEmpresa } });

    modalRef.componentInstance.data = data;
    modalRef.componentInstance.dataTemp = data;

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if (value && value.id) {
          this.asignarEmpresa(value);
          modalRef.close();
        }
      }
    );
  }

  asignarEmpresa(value: any) {
    this.form.controls["cEmpresa"].setValue(value.cDescripcion);
    this.form.controls["nEmpresa"].setValue(value.id);
  }

  async openModalAlmacenes() {
    const modalRef = this.modalService.open(BusquedaModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'dialog-formulario-chico',
    });

    modalRef.componentInstance.titulo = 'Búsqueda de almacenes';

    modalRef.componentInstance.props = [{
      cNombre: 'Folio',
      cPropiedad: 'nAlmacen'
    },
    {
      cNombre: 'Almacén',
      cPropiedad: 'cDescripcion'
    }
    ];

    const almacenResp = await this.serviceAlmacen.obtenerAlmacenes(0).toPromise();

    const data = almacenResp.data.map((item: any) => { return { nAlmacen: item.nAlmacen, cDescripcion: item.cDescripcion } });

    modalRef.componentInstance.data = data;
    modalRef.componentInstance.dataTemp = data;

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if (value && value.id) {
          this.asignarAlmacen(value);
          modalRef.close();
        }
      }
    );
  }

  asignarAlmacen(value: any) {
    this.form.controls["cAlmacen"].setValue(value.cDescripcion);
    this.form.controls["nAlmacen"].setValue(value.id);
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

  asignarProveedor(value: any) {
    this.form.controls["cProveedor"].setValue(value.cDescripcion);
    this.form.controls["nProveedor"].setValue(value.id);
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

    const articuloResp = await this.serviceArticulo.obtenerArticulos(0, -1).toPromise();

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

  asignarArticulo(value: any) {
    this.form.controls["cArticulo"].setValue(value.cDescripcion);
    this.form.controls["nArticulo"].setValue(value.id);
  }

  consultar() {
    this.spinner.show();
    this.compras = [];
    this.service.obtenerConsultaCompras(
      this.cTipoCompra,
      this.dFechaInicio ? new Date(this.dFechaInicio).toISOString().split('T')[0] : '',
      this.dFechaFin ? new Date(this.dFechaFin).toISOString().split('T')[0] : '',
      this.nCompra ?? 0,
      this.nEmpresa ?? 0,
      this.nProveedor ?? 0,
      this.nAlmacen ?? 0,
      this.nArticulo ?? 0,
      ''
    ).subscribe((resp: any) => {
      if (resp) {

        for (const compra of resp.data) {
          if (compra.cTipoCompra === "I") {
            compra.nCostoLitroNacional = compra.nCostoTotalFinal / compra.nLitrosCompra
          }else{
            compra.nCostoLitroNacional = compra.nCostoLitro
          }
          this.compras.push({
            nCompra: compra.nCompra,
            cTipoCompra: compra.cTipoCompra,
            cFechaCompra: compra.cFechaCompra,

            cEmpresa: compra.cEmpresa,
            nEmpresa: compra.nEmpresa,
            nAlmacen: compra.nAlmacen,
            cAlmacen: compra.cAlmacen,
            nProveedor: compra.nProveedor,
            cProveedor: compra.cProveedor,
            nArticulo: compra.nArticulo,
            cArticulo: compra.cArticulo,
            dFechaInicio: compra.dFechaInicio,
            dFechaFin: compra.dFechaFin,
            nLitrosCompra: compra.nLitrosCompra,
            nCostoLitro: compra.nCostoLitro,
            nCostoTotal: compra.nCostoTotal,
            nCostoFactura: compra.nCostoFactura,
            nCostoFlete: compra.nCostoFlete ,
            nCostoLogistico: compra.nCostoLogistico * compra.nTipoCambio,
            nCostoCruce: compra.nCostoCruce * compra.nTipoCambioLocal,
            nCostoTotalFinal: compra.nCostoTotalFinal,
            nCostoLitroNacional: compra.nCostoLitroNacional
          });

          console.log(compra.nTipoCambioLocal);


        }
        /*  this.compras = resp.data;  */
        console.log('Compras:', resp);
      }
      this.spinner.hide();
    }, (error: any) => {
      this.spinner.hide();
    });
  }

  limpiar() {
    this.form.controls["nCompra"].setValue('');
    this.form.controls["cTipoCompra"].setValue('');
    this.form.controls["cEmpresa"].setValue('');
    this.form.controls["nEmpresa"].setValue('');
    this.form.controls["nAlmacen"].setValue('');
    this.form.controls["cAlmacen"].setValue('');
    this.form.controls["nProveedor"].setValue('');
    this.form.controls["cProveedor"].setValue('');
    this.form.controls["dFechaInicio"].setValue('');
    this.form.controls["dFechaFin"].setValue('');
    this.form.controls["nArticulo"].setValue('');
    this.form.controls["cArticulo"].setValue('');

    this.compras = [];
  }


}
