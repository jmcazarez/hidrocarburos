import { BusquedaCompraComponent } from './busqueda-compra/busqueda-compra.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { AlmacenService } from 'src/services/almacen.service';
import { ArticulosService } from 'src/services/articulos.service';
import { ChoferesService } from 'src/services/choferes.service';
import { ComprasService } from 'src/services/compras.service';
import { EmpresaService } from 'src/services/empresa.service';
import { FleterasService } from 'src/services/fleteras.service';
import { ProveedorService } from 'src/services/proveedor.service';
import { UtilsService } from 'src/services/utils.service';
import { Patterns } from 'src/utils/patterns';
import { BusquedaModalComponent } from '../busquedas/busqueda-modal/busqueda-modal.component';
import { BusquedaFleteComponent } from '../nationals/busqueda-flete/busqueda-flete.component';
import { BusquedaFleteraComponent } from '../parcel/busqueda-fletera/busqueda-fletera.component';
import * as dayjs from 'dayjs';
import { MaskApplierService } from 'ngx-mask';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-nationals',
  templateUrl: './nationals.component.html',
  styleUrls: ['./nationals.component.scss'],
  preserveWhitespaces: true
})
export class NationalsComponent implements OnInit {

  form: FormGroup;
  maxDate = new Date();

  costoLitroFactura = .2;
  nValorGalon = 3.7854;
  nValorCostoCruce = 3800;
  nValorCostoLogistico = 100;
  nValorCostoFlete = 0;


  constructor(
    private service: ComprasService,
    private util: UtilsService,
    public modalService: NgbModal,
    private patterns: Patterns,
    private serviceEmpresa: EmpresaService,
    private serviceAlmacen: AlmacenService,
    private serviceProveedor: ProveedorService,
    private serviceFletara: FleterasService,
    private serviceChofer: ChoferesService,
    private serviceArticulo: ArticulosService,
    private maskService: MaskApplierService,
    private cp: CurrencyPipe
  ) { }

  async ngOnInit(): Promise<void> {
    this.form = new FormGroup({
      nCompra: new FormControl({ value: '', disabled: true }, []),
      cTipoCompra: new FormControl('', Validators.required),
      dFechaCompra: new FormControl('', [Validators.required]),
      cEmpresa: new FormControl({ value: '', disabled: true }, Validators.required),
      nEmpresa: new FormControl('', Validators.required),
      nAlmacen: new FormControl(''),
      cAlmacen: new FormControl({ value: '', disabled: true }, Validators.required),
      nProveedor: new FormControl('', Validators.required),
      cProveedor: new FormControl({ value: '', disabled: true }, Validators.required),
      dFechaFactura: new FormControl('', []),
      cTicket: new FormControl('', []),
      cFactura: new FormControl('', []),
      nFletera: new FormControl('', Validators.required),
      cFletera: new FormControl({ value: '', disabled: true }, Validators.required),
      nChofer: new FormControl('', Validators.required),
      cChofer: new FormControl({ value: '', disabled: true }, Validators.required),
      cNumeroTrailer: new FormControl('', Validators.required),
      nArticulo: new FormControl('', Validators.required),
      cArticulo: new FormControl({ value: '', disabled: true }, Validators.required),
      cFuller1: new FormControl('', []),
      cFuller2: new FormControl('', []),
      cSellos1: new FormControl('', []),
      cSellos2: new FormControl('', []),
      nLitrosCompra: new FormControl('', Validators.required),
      nTipoCambio: new FormControl('', Validators.required),
      nCostoTotal: new FormControl('', [Validators.required]),
      nCostoCruce: new FormControl(this.nValorCostoCruce, Validators.required),
      nCostoFactura: new FormControl({ value: '', disabled: false }, []),
      nCostoFlete: new FormControl('', []),
      nGalonesCompra: new FormControl('', []),
      nCostoGalon: new FormControl('', []),
      nCostoFinalLitro: new FormControl({ value: '', disabled: true }, []),
      nCostoFinalDolares: new FormControl({ value: '', disabled: true }, []),
      nCostoLitro: new FormControl({ value: 0, disabled: true }, []),
      nCostoLogistico: new FormControl('', []),
      nCostoFinalCompra: new FormControl({ value: '', disabled: true }, []),
      cNumeroPatona: new FormControl('', []),
      cSellos: new FormControl('', []),
      nKilometrosRecorridos: new FormControl('', []),
      nTipoCambioLocal: new FormControl('', []),
      nRuta: new FormControl('', []),
      cRuta: new FormControl({ value: '', disabled: true }, []),
    });
    this.asignarValoresIniciales();
    this.calcularTotales();
  }

  async asignarValoresIniciales() {
    this.form.get('nCostoCruce')?.setValue(this.nValorCostoCruce);
    this.form.get('nCostoFlete')?.setValue(this.nValorCostoFlete);
    this.form.get('nCostoLogistico')?.setValue(this.nValorCostoLogistico);

    const almacenResp = await this.serviceAlmacen.obtenerAlmacenes(0).toPromise();
    const data = almacenResp.data.map((item: any) => { return { nAlmacen: item.nAlmacen, cDescripcion: item.cDescripcion } });

    for (const item of data) {
      if (item.cDescripcion === 'CEDI CULIACAN') {
        this.asignarAlmacen(item);
        return;
      }
    }

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
    return this.form.get('nEmpresa')?.value ?? 0;
  }

  get nAlmacen(): number {
    return this.form.get('nAlmacen')?.value ?? 0;
  }

  get nProveedor(): number {
    return this.form.get('nProveedor')?.value ?? 0;
  }

  get dFechaFactura(): any {
    return this.form.get('dFechaFactura')?.value;
  }

  get dFechaCompra(): any {
    return this.form.get('dFechaCompra')?.value;
  }

  get cFactura(): string {
    return this.form.get('cFactura')?.value ?? '';
  }

  get nFletera(): number {
    return this.form.get('nFletera')?.value ?? 0;
  }

  get nChofer(): number {
    return this.form.get('nChofer')?.value ?? 0;
  }

  get cNumeroTrailer(): string {
    return this.form.get('cNumeroTrailer')?.value ?? '';
  }

  get nArticulo(): number {
    return this.form.get('nArticulo')?.value ?? 0;
  }

  get cFuller1(): string {
    return this.form.get('cFuller1')?.value ?? '';
  }

  get cFuller2(): string {
    return this.form.get('cFuller2')?.value ?? '';
  }

  get cSellos1(): string {
    return this.form.get('cSellos1')?.value ?? '';
  }

  get cSellos2(): string {
    return this.form.get('cSellos2')?.value ?? '';
  }

  get nLitrosCompra(): number {
    return this.form.get('nLitrosCompra')?.value !== '' ? parseFloat(this.form.get('nLitrosCompra')?.value.toString().replaceAll(',', '')) : 0;
  }

  get nTipoCambio(): number {
    return this.form.get('nTipoCambio')?.value !== '' ? parseFloat(this.form.get('nTipoCambio')?.value.toString().replaceAll(',', '')) : 0;
  }

  get nCostoTotal(): number {
    return this.form.get('nCostoTotal')?.value !== '' ? parseFloat(this.form.get('nCostoTotal')?.value.toString().replaceAll(',', '')) : 0;
  }

  get nCostoFactura(): number {
    return this.form.get('nCostoFactura')?.value !== '' ? parseFloat(this.form.get('nCostoFactura')?.value.toString().replaceAll(',', '')) : 0;
  }

  get nCostoFlete(): number {
    return this.form.get('nCostoFlete')?.value !== '' ? parseFloat(this.form.get('nCostoFlete')?.value.toString().replaceAll(',', '')) : 0;
  }

  get nCostoCruce(): number {
    return this.form.get('nCostoCruce')?.value !== '' ? parseFloat(this.form.get('nCostoCruce')?.value.toString().replaceAll(',', '')) : 0;
  }

  get nGalonesCompra(): number {
    return this.form.get('nGalonesCompra')?.value !== '' ? parseFloat(this.form.get('nGalonesCompra')?.value.toString().replaceAll(',', '')) : 0;
  }

  get nCostoGalon(): number {
    return this.form.get('nCostoGalon')?.value !== '' ? parseFloat(this.form.get('nCostoGalon')?.value.toString().replaceAll(',', '')) : 0;
  }

  get cTicket(): string {
    return this.form.get('cTicket')?.value !== '' ? this.form.get('cTicket')?.value : '';
  }

  get nCostoLitro(): number {
    return this.form.get('nCostoLitro')?.value !== '' ? parseFloat(this.form.get('nCostoLitro')?.value.toString().replaceAll(',', '')) : 0;
  }

  get nCostoLogistico(): number {
    return this.form.get('nCostoLogistico')?.value !== '' ? parseFloat(this.form.get('nCostoLogistico')?.value.toString().replaceAll(',', '')) : 0;
  }

  get nPrecioKMFlete(): number {
    return this.form.get('nPrecioKMFlete')?.value !== '' ? parseFloat(this.form.get('nPrecioKMFlete')?.value.toString().replaceAll(',', '')) : 0;
  }

  get nKilometrosRecorridos(): number {
    return this.form.get('nKilometrosRecorridos')?.value !== '' ? parseFloat(this.form.get('nKilometrosRecorridos')?.value.toString().replaceAll(',', '')) : 0;
  }

  get nCostoLitroMX(): number {
    return this.form.get('nCostoLitroMX')?.value !== '' ? parseFloat(this.form.get('nCostoLitroMX')?.value.toString().replaceAll(',', '')) : 0;
  }

  get nTipoCambioLocal(): number {
    return this.form.get('nTipoCambioLocal')?.value !== '' ? parseFloat(this.form.get('nTipoCambioLocal')?.value.toString().replaceAll(',', '')) : 0;
  }

  get cNumeroPatona(): string {
    return this.form.get('cNumeroPatona')?.value ?? '';
  }

  get cSellos(): string {
    return this.form.get('cSellos')?.value ?? '';
  }

  get cRuta(): string {
    return this.form.get('cRuta')?.value ?? '';
  }

  get nRuta(): string {
    return this.form.get('nRuta')?.value ?? '';
  }

  cambiarTipoCompra() {

    const tipo = this.cTipoCompra;
    this.limpiar();

    this.form.get('cTipoCompra')?.setValue(tipo);
    this.habilitarCampos();
  }

  habilitarCampos() {

    if (this.cTipoCompra !== 'I') { // Nacional o vacía
      this.form.controls["nGalonesCompra"].setValue('');
      this.form.controls["nGalonesCompra"].setValidators(null);
      this.form.controls["nGalonesCompra"].updateValueAndValidity();

      this.form.controls["nCostoGalon"].setValue('');
      this.form.controls["nCostoGalon"].setValidators(null);
      this.form.controls["nCostoGalon"].updateValueAndValidity();

      this.form.controls["nCostoFinalDolares"].setValue('');
      this.form.controls["nCostoFinalDolares"].setValidators(null);
      this.form.controls["nCostoFinalDolares"].updateValueAndValidity();

      this.form.controls["nCostoCruce"].setValue('');
      this.form.controls["nCostoCruce"].setValidators(null);
      this.form.controls["nCostoCruce"].updateValueAndValidity();

      this.form.controls["nCostoFactura"].setValue('');
      this.form.controls["nCostoFactura"].setValidators(null);
      this.form.controls["nCostoFactura"].updateValueAndValidity();

      this.form.controls["nLitrosCompra"].setValue('');
      this.form.controls["nLitrosCompra"].enable();
      this.form.controls["nLitrosCompra"].updateValueAndValidity();

      this.form.controls["cTicket"].setValue('');
      this.form.controls["cTicket"].setValidators(null);
      this.form.controls["cTicket"].updateValueAndValidity();

      this.form.controls["nCostoLitro"].setValue('');

      this.form.controls["nCostoTotal"].setValue('');
      this.form.controls["nCostoTotal"].enable();

      this.form.controls["nTipoCambio"].setValue(0);
      this.form.controls["nRuta"].setValue('');
      this.form.controls["cRuta"].setValue('');
      this.form.controls["cRuta"].setValidators(null);
      this.form.controls["nCostoFactura"].setValue(0);
      this.form.controls["nCostoFactura"].enable();

    } else { // Importada
      this.form.controls["nGalonesCompra"].setValue('');
      this.form.controls["nGalonesCompra"].setValidators(Validators.required);
      this.form.controls["nGalonesCompra"].updateValueAndValidity();

      this.form.controls["nCostoGalon"].setValue('');
      this.form.controls["nCostoGalon"].setValidators(Validators.required);
      this.form.controls["nCostoGalon"].updateValueAndValidity();

      this.form.controls["nCostoFinalDolares"].setValue('');
      this.form.controls["nCostoFinalDolares"].setValidators(Validators.required);
      this.form.controls["nCostoFinalDolares"].updateValueAndValidity();

      this.form.controls["nCostoCruce"].setValue('');
      this.form.controls["nCostoCruce"].setValidators(Validators.required);
      this.form.controls["nCostoCruce"].updateValueAndValidity();

      this.form.controls["nCostoFactura"].setValue('');
      this.form.controls["nCostoFactura"].setValidators(Validators.required);
      this.form.controls["nCostoFactura"].updateValueAndValidity();

      this.form.controls["nLitrosCompra"].setValue('');
      this.form.controls["nLitrosCompra"].disable();
      this.form.controls["nLitrosCompra"].updateValueAndValidity();

      this.form.controls["cTicket"].setValue('');
      this.form.controls["cTicket"].setValidators(Validators.required);
      this.form.controls["cTicket"].updateValueAndValidity();

      this.form.controls["nCostoLitro"].setValue('');

      this.form.controls["nCostoTotal"].setValue('');
      this.form.controls["nCostoTotal"].disable();

      this.form.controls["nTipoCambio"].setValue('');
      this.form.controls["nRuta"].setValue('');
      this.form.controls["cRuta"].setValue('');
      this.form.controls["cRuta"].setValidators(Validators.required);
      this.form.controls["nCostoFactura"].disable();
      this.asignarValoresIniciales();


    }

  }

  async guardar(): Promise<void> {

    this.util.dialogConfirm('¿Está seguro que desea guardar los datos?').then((result) => {

      // validar la fecha de compra

      let fechaCompra = dayjs(this.dFechaCompra);
      // fechaCompra.setHours(0,0,0,0);

      let fechaActual = dayjs();

      if (fechaCompra > fechaActual) {
        this.util.dialogWarning('La fecha de compra no debe ser mayor a la fecha actual.');
        return;
      }

      if (this.dFechaFactura) {
        let fechaFactura = dayjs(this.dFechaFactura);
        if (fechaFactura > fechaActual) {
          this.util.dialogWarning('La fecha de factura no debe ser mayor a la fecha actual.');
          return;
        }
      }

      if (this.nAlmacen <= 0) {
        this.util.dialogWarning('Ocurrió un error al enviar el almacen.');
        return;
      }

      if (result.isConfirmed) {

        const obj = {
          nCompra: this.nCompra,
          cTipoCompra: this.cTipoCompra,
          nEmpresa: this.nEmpresa,
          nAlmacen: this.nAlmacen,
          nProveedor: this.nProveedor,
          dFechaFactura: this.dFechaFactura ? new Date(this.dFechaFactura).toISOString().split('T')[0] : null,
          cFactura: this.cFactura ? this.cFactura : null,
          nFletera: this.nFletera,
          nChofer: this.nChofer,
          cNumeroTrailer: this.cNumeroTrailer,
          nArticulo: this.nArticulo,
          cFuller1: this.cFuller1,
          cFuller2: this.cFuller2,
          cSellos1: this.cSellos1,
          cSellos2: this.cSellos2,
          nLitrosCompra: this.nLitrosCompra.toString().replaceAll(',', ''),
          nTipoCambio: this.nTipoCambio.toString().replaceAll(',', ''),
          nCostoTotal: this.nCostoTotal.toString().replaceAll(',', ''),
          nCostoCruce: this.cTipoCompra === 'I' ? this.nCostoCruce : null,
          nCostoFactura: this.nCostoFactura.toString().replaceAll(',', ''),
          dFechaCompra: new Date(this.dFechaCompra).toISOString().split('T')[0],
          nCostoFlete: this.nCostoFlete.toString().replaceAll(',', ''),
          cTicket: this.cTipoCompra === 'I' ? this.cTicket : null,
          nGalonesCompra: this.cTipoCompra === 'I' ? this.nGalonesCompra.toString().replaceAll(',', '') : null,
          nCostoGalon: this.cTipoCompra === 'I' ? this.nCostoGalon.toString().replaceAll(',', '') : null,
          nCostoLitro: this.nCostoLitro.toString().replaceAll(',', ''),
          nCostoLogistico: this.cTipoCompra === 'I' ? this.nCostoLogistico.toString().replaceAll(',', '') : null,
          cNumeroPatona: this.cNumeroPatona,
          cSellos: this.cSellos,
          nKilometrosRecorridos: this.nKilometrosRecorridos.toString().replaceAll(',', ''),
          nTipoCambioLocal: this.nTipoCambioLocal.toString().replaceAll(',', ''),
          nRuta: this.nRuta
        };


        this.service.guardarCompra(obj).subscribe(async (resp: any) => {
          if (resp.error !== '') {
            this.util.dialogError(resp.error.error.type);
          }
          else {
            this.limpiar();
            this.util.dialogSuccess('Compra guardada correctamente.');
          }
        }, (err: { error: any; }) => {
          this.util.dialogError('Error al guardar la compra.');
        });
      }
    });

  }

  limpiarCampo(campo: any) {
    console.log('value:', campo.value);
    if (campo.value === '') {
      campo.setValue(null);
    }
  }


  openModal() {
    const modalRef = this.modalService.open(BusquedaCompraComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'dialog-formulario',
    });

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if (value && value.id) {
          this.form.controls["nCompra"].setValue(value.id);
          this.mostrarDatos();
          modalRef.close();
        }
      }
    );
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

  async openModalFlete() {
    const modalRef = this.modalService.open(BusquedaFleteComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'dialog-formulario-mediano',
    });

    /*  const fleteResp = await this.service.obtenerFlete(0).toPromise();
 
     const data = fleteResp.data.map((item: any) => { return { nFlete: item.nFlete, cOrigen: item.cOrigen, cDestino: item.cDestino, nPrecio: item.nPrecio, nKilometraje: item.nKilometraje } });
 
     modalRef.componentInstance.data = data;
     modalRef.componentInstance.dataTemp = data;
  */
    modalRef.closed.subscribe(
      async value => {
        if (value) {
          const fleteResp = await this.service.obtenerFlete(value.id).toPromise();

          if (fleteResp.data[0]) {
            this.asignarFlete(fleteResp.data[0]);
            modalRef.close();
          }
        }
      }
    );

  }
  asignarAlmacen(value: any) {
    this.form.controls["cAlmacen"].setValue(value.cDescripcion);
    this.form.controls["nAlmacen"].setValue(value.nAlmacen);

    console.log('value:', value);
  }

  asignarFlete(value: any) {
    this.form.controls["cRuta"].setValue(value.cOrigen + ' - ' + value.cDestino);
    this.form.controls["nRuta"].setValue(value.nRuta);
    this.form.controls["nCostoFlete"].setValue(value.nPrecio);
    this.calcularTotales();
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

    const tipo = this.cTipoCompra !== 'I' ? 1 : 0;

    const proveedorResp = await this.serviceProveedor.obtenerProveedores(0, tipo).toPromise();

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

  async openModalFleteras() {
    const modalRef = this.modalService.open(BusquedaModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'dialog-formulario-chico',
    });

    modalRef.componentInstance.titulo = 'Búsqueda de fleteras';

    modalRef.componentInstance.props = [{
      cNombre: 'Folio',
      cPropiedad: 'nFletera'
    },
    {
      cNombre: 'Fletera',
      cPropiedad: 'cDescripcion'
    }
    ];

    const fleteraResp = await this.serviceFletara.obtenerFleteras(0).toPromise();

    const data = fleteraResp.data.map((item: any) => { return { nFletera: item.nFletera, cDescripcion: item.cDescripcion } });

    modalRef.componentInstance.data = data;
    modalRef.componentInstance.dataTemp = data;

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if (value && value.id) {
          this.asignarFleteras(value);
          modalRef.close();
        }
      }
    );
  }

  asignarFleteras(value: any) {
    this.form.controls["cFletera"].setValue(value.cDescripcion);
    this.form.controls["nFletera"].setValue(value.id);
  }

  async openModalChoferes() {
    const modalRef = this.modalService.open(BusquedaModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'dialog-formulario-chico',
    });

    modalRef.componentInstance.titulo = 'Búsqueda de choferes';

    modalRef.componentInstance.props = [{
      cNombre: 'Folio',
      cPropiedad: 'nChofer'
    },
    {
      cNombre: 'Chofer',
      cPropiedad: 'cDescripcion'
    }
    ];

    const fletera = this.nFletera > 0 ? this.nFletera : 0;

    const choferResp = await this.serviceChofer.obtenerChoferes(0, fletera).toPromise();

    const data = choferResp.data.map((item: any) => { return { nChofer: item.nChofer, cDescripcion: item.cNombreChofer } });

    modalRef.componentInstance.data = data;
    modalRef.componentInstance.dataTemp = data;

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if (value && value.id) {
          this.asignarChoferes(value);
          modalRef.close();
        }
      }
    );
  }

  asignarChoferes(value: any) {
    this.form.controls["cChofer"].setValue(value.cDescripcion);
    this.form.controls["nChofer"].setValue(value.id);
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

    const tipo = this.cTipoCompra !== 'I' ? 1 : 0;

    const articuloResp = await this.serviceArticulo.obtenerArticulos(0, tipo).toPromise();

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

  mostrarDatos() {
    this.service.obtenerCompras(this.nCompra).subscribe((resp: any) => {
      if (resp) {
        const compra = resp.data[0];

        console.log('compra:', compra);

        this.form.controls["nCompra"].setValue(compra.nCompra);
        this.form.controls["cTipoCompra"].setValue(compra.cTipoCompra);
        this.form.controls["cEmpresa"].setValue(compra.cEmpresa);
        this.form.controls["nEmpresa"].setValue(compra.nEmpresa);
        this.form.controls["nAlmacen"].setValue(compra.nAlmacen);
        this.form.controls["cAlmacen"].setValue(compra.cAlmacen);
        this.form.controls["nProveedor"].setValue(compra.nProveedor);
        this.form.controls["cProveedor"].setValue(compra.cProveedor);
        this.form.controls["dFechaFactura"].setValue(compra.dFechaFactura ? new Date(compra.dFechaFactura).toISOString().split('T')[0] : '');
        this.form.controls["dFechaCompra"].setValue(new Date(compra.dFechaCompra).toISOString().split('T')[0]);
        this.form.controls["cFactura"].setValue(compra.cFactura);
        this.form.controls["cTicket"].setValue(compra.cFactura);
        this.form.controls["nFletera"].setValue(compra.nFletera);
        this.form.controls["cFletera"].setValue(compra.cFletera);
        this.form.controls["nChofer"].setValue(compra.nChofer);
        this.form.controls["cChofer"].setValue(compra.cChofer);
        this.form.controls["cNumeroTrailer"].setValue(compra.cNumeroTrailer);
        this.form.controls["nArticulo"].setValue(compra.nArticulo);
        this.form.controls["cArticulo"].setValue(compra.cArticulo);
        this.form.controls["cFuller1"].setValue(compra.cFuller1);
        this.form.controls["cFuller2"].setValue(compra.cFuller2);
        this.form.controls["cSellos1"].setValue(compra.cSellos1);
        this.form.controls["cSellos2"].setValue(compra.cSellos2);
        this.form.controls["nLitrosCompra"].setValue(parseFloat(compra.nLitrosCompra).toFixed(4));
        this.form.controls["nTipoCambio"].setValue(parseFloat(compra.nTipoCambio).toFixed(4));
        this.form.controls["nCostoFactura"].setValue(parseFloat(compra.nCostoFactura).toFixed(4));
        this.form.controls["nCostoFlete"].setValue(parseFloat(compra.nCostoFlete).toFixed(4));
        this.form.controls["nCostoCruce"].setValue(parseFloat(compra.nCostoCruce).toFixed(4));
        this.form.controls["nGalonesCompra"].setValue(parseFloat(compra.nGalonesCompra).toFixed(4));
        this.form.controls["nCostoGalon"].setValue(parseFloat(compra.nCostoGalon).toFixed(4));
        this.form.controls["nCostoLitro"].setValue(parseFloat(compra.nCostoLitro).toFixed(4));
        this.form.controls["nCostoLogistico"].setValue(parseFloat(compra.nCostoLogistico).toFixed(4));
        this.form.controls["nCostoTotal"].setValue(parseFloat(compra.nCostoTotal).toFixed(4));
        this.form.controls["cNumeroPatona"].setValue(compra.cNumeroPatona);
        this.form.controls["cSellos"].setValue(compra.cSellos);
        this.form.controls["nKilometrosRecorridos"].setValue(parseFloat(compra.nKilometrosRecorridos).toFixed(4));
        this.form.controls["nTipoCambioLocal"].setValue(parseFloat(compra.nTipoCambioLocal).toFixed(4));

        this.form.controls["cTipoCompra"].disable();

        this.form.controls["nLitrosCompra"].disable();
        this.form.controls["nRuta"].setValue(compra.nRuta);
        this.form.controls["cRuta"].setValue(compra.cRuta);
        console.log(compra.cRuta);
        if (compra.cTipoCompra !== 'I') {
          this.form.controls["nCostoTotal"].enable();
          this.form.controls["nCostoFactura"].enable();
          this.cambioCostoFactura();
        } else {
          this.form.controls["nCostoFactura"].disable();
          this.form.controls["nCostoTotal"].disable();

          this.calcularTotales();
        }

      }
    }, (error: any) => {

    });
  }

  cambioCostoFactura() {
    console.log('entro');
    if (this.cTipoCompra !== 'I') { // Nacional{
      let nCostoFinal = Number(this.nCostoTotal.toFixed(4)) + Number(this.nCostoFactura.toFixed(4))
      console.log(nCostoFinal);
      this.form.controls["nCostoFinalCompra"].setValue(this.aplicarFormato(nCostoFinal.toFixed(4)));
      let nCostoPorLitro = (this.nCostoTotal + this.nCostoFactura) / this.nLitrosCompra
      this.form.controls["nCostoFinalLitro"].setValue(this.aplicarFormato(nCostoPorLitro.toFixed(4)));
    } else {

    }
  }
  calcularTotales() {

    console.log('calculando totales ...');

    let costoLitro = this.nCostoTotal / this.nLitrosCompra;
    let totalCostoFactura = 0;
    const costoFlete = this.nCostoFlete;

    if (!costoLitro) {
      costoLitro = 0;
    }


    if (this.cTipoCompra !== 'I') { // Nacional
      totalCostoFactura = this.nCostoTotal * .02;
      const costoFinalCompra = this.nCostoTotal + totalCostoFactura;
      let costoFinalLitro = costoFinalCompra / this.nLitrosCompra;
      this.form.controls["nCostoLitro"].setValue(this.aplicarFormato(costoLitro.toFixed(4)));
      this.form.controls["nCostoFactura"].setValue(this.aplicarFormato(totalCostoFactura.toFixed(4)));

      if (!costoFinalLitro || costoFinalLitro === Infinity) {
        costoFinalLitro = 0;
      }

      this.form.controls["nCostoFinalCompra"].setValue(this.aplicarFormato(costoFinalCompra.toFixed(4)));
      this.form.controls["nCostoFinalLitro"].setValue(this.aplicarFormato(costoFinalLitro.toFixed(4)));

    } else {
      totalCostoFactura = this.costoLitroFactura * this.nLitrosCompra;
      const litrosGalones = this.nGalonesCompra * this.nValorGalon;
      this.form.controls["nLitrosCompra"].setValue(this.aplicarFormato(litrosGalones.toFixed(4)));
      this.form.controls["nCostoFactura"].setValue(this.aplicarFormato(totalCostoFactura.toFixed(4)));

      const totalCruce = this.nCostoCruce * this.nTipoCambioLocal;
      const totalCostoLogistico = this.nCostoLogistico * this.nTipoCambio;
      const totalCostoFlete = this.nCostoFlete;

      const totalDolares = this.nCostoGalon * this.nGalonesCompra;
      this.form.controls["nCostoFinalDolares"].setValue(this.aplicarFormato(totalDolares.toFixed(4)));

      const totalPesos = totalDolares * this.nTipoCambio;
      this.form.controls["nCostoTotal"].setValue(this.aplicarFormato(totalPesos.toFixed(4)));

      const costoLitro = totalPesos / litrosGalones;

      this.form.controls["nCostoLitro"].setValue(this.aplicarFormato(costoLitro.toFixed(4)));

      const costoFinalCompra = totalPesos + totalCostoFactura + totalCruce + totalCostoFlete + totalCostoLogistico;

      console.log(totalPesos)
      console.log(totalCostoFactura)
      console.log(totalCruce)
      console.log(totalCostoFlete)
      console.log(totalCostoLogistico)

      let final = costoFinalCompra / this.nLitrosCompra;

      this.form.controls["nCostoFinalCompra"].setValue(this.aplicarFormato(costoFinalCompra.toFixed(4)));
      this.form.controls["nCostoFinalLitro"].setValue(this.aplicarFormato(final.toFixed(4)));

    }



  }

  limpiar() {
    this.form.controls["nFletera"].setValue('');
    this.form.controls["nCompra"].setValue('');
    this.form.controls["cTipoCompra"].setValue('');
    this.form.controls["cEmpresa"].setValue('');
    this.form.controls["nEmpresa"].setValue('');
    this.form.controls["nAlmacen"].setValue('');
    this.form.controls["cAlmacen"].setValue('');
    this.form.controls["nProveedor"].setValue('');
    this.form.controls["cProveedor"].setValue('');
    this.form.controls["dFechaFactura"].setValue('');
    this.form.controls["dFechaCompra"].setValue('');
    this.form.controls["cFactura"].setValue('');
    this.form.controls["nFletera"].setValue('');
    this.form.controls["cFletera"].setValue('');
    this.form.controls["nChofer"].setValue('');
    this.form.controls["cChofer"].setValue('');
    this.form.controls["cNumeroTrailer"].setValue('');
    this.form.controls["nArticulo"].setValue('');
    this.form.controls["cArticulo"].setValue('');
    this.form.controls["cFuller1"].setValue('');
    this.form.controls["cFuller2"].setValue('');
    this.form.controls["cSellos1"].setValue('');
    this.form.controls["cSellos2"].setValue('');
    this.form.controls["nLitrosCompra"].setValue('');
    this.form.controls["nTipoCambio"].setValue('');
    this.form.controls["nCostoTotal"].setValue('');
    this.form.controls["nCostoFactura"].setValue('');
    this.form.controls["nCostoFlete"].setValue('');
    this.form.controls["nCostoLitro"].setValue('');
    this.form.controls["nCostoFinalLitro"].setValue('');
    this.form.controls["nCostoFinalDolares"].setValue('');
    this.form.controls["nCostoLogistico"].setValue('');

    this.form.controls["nCostoCruce"].setValue(this.nValorCostoCruce);

    this.form.controls["nCostoFinalCompra"].setValue('');
    this.form.controls["nCostoFinalLitro"].setValue('');

    this.form.controls["cTipoCompra"].enable();

    this.form.controls["cNumeroPatona"].setValue('');
    this.form.controls["cSellos"].setValue('');
    this.form.controls["nKilometrosRecorridos"].setValue('');
    this.form.controls["nTipoCambioLocal"].setValue('');
    this.form.controls["nRuta"].setValue('');
    this.form.controls["cRuta"].setValue('');
    this.asignarValoresIniciales();

  }

  eliminar() {
    this.util.dialogConfirm('¿Está seguro que desea eliminar los datos?').then((result) => {
      if (result.isConfirmed) {
        this.service.eliminarCompra(this.nFletera).subscribe(async (resp: any) => {
          this.util.dialogSuccess('Fletera eliminada correctamente.');
          this.limpiar();
        }, (err: { error: any; }) => {
          // if(err.error.error.type){
          //   this.util.dialogError(err.error.error.type);
          // }else{
          //   this.util.dialogError('Error al guardar la empresa.');
          // }
          this.util.dialogError('Error al eliminar la fletera.');

        });
      }
    });
  }

  aplicarFormato(value: any) {
    if (value && value.length > 0) {
      return this.cp.transform(value, ' ', 'symbol', '1.2-4');
    }
    return value;
  }

}
