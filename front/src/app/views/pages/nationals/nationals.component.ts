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
import { BusquedaFleteraComponent } from '../parcel/busqueda-fletera/busqueda-fletera.component';

@Component({
  selector: 'app-nationals',
  templateUrl: './nationals.component.html',
  styleUrls: ['./nationals.component.scss'],
  preserveWhitespaces: true
})
export class NationalsComponent implements OnInit {

  form: FormGroup;

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
    private serviceArticulo: ArticulosService
  ) {}

  async ngOnInit(): Promise<void> {
    this.form = new FormGroup({
      nCompra : new FormControl({ value: '', disabled: true }, []),
      cTipoCompra : new FormControl('', Validators.required),
      cEmpresa : new FormControl({value: '', disabled: true}, Validators.required),
      nEmpresa : new FormControl('', Validators.required),
      nAlmacen : new FormControl('', Validators.required),
      cAlmacen : new FormControl({ value: '', disabled: true }, Validators.required),
      nProveedor : new FormControl('', Validators.required),
      cProveedor : new FormControl({ value: '', disabled: true }, Validators.required),
      dFechaFactura : new FormControl('', Validators.required),
      cTicket : new FormControl('', []),
      cFactura : new FormControl('', Validators.required),
      nFletera : new FormControl('', Validators.required),
      cFletera : new FormControl({ value: '', disabled: true }, Validators.required),
      nChofer : new FormControl('', Validators.required),
      cChofer : new FormControl({ value: '', disabled: true }, Validators.required),
      cNumeroTrailer : new FormControl('', Validators.required),
      nArticulo : new FormControl('', Validators.required),
      cArticulo : new FormControl({ value: '', disabled: true }, Validators.required),
      cFuller1 : new FormControl('', []),
      cFuller2 : new FormControl('', []),
      cSellos1 : new FormControl('', []),
      cSellos2 : new FormControl('', []),
      nLitrosCompra : new FormControl('', Validators.required),
      nTipoCambio : new FormControl('', Validators.required),
      nCostoTotal : new FormControl({ value: '', disabled: true }, []),
      nCostoCruce : new FormControl('', Validators.required),
      nCostoFactura : new FormControl('', []),
      nCostoFlete : new FormControl('', Validators.required),
      nGalonesCompra : new FormControl('', []),
      nCostoGalon : new FormControl('', []),
      nCostoFinalLitro : new FormControl({ value: '', disabled: true }, []),
      nCostoFinalDolares : new FormControl({ value: '', disabled: true }, []),
    });
    this.calcularTotales();
  }

  get nCompra(): number {
    if (!this.form.get('nCompra')?.value ||  this.form.get('nCompra')?.value == ''){
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
    return this.form.get('nLitrosCompra')?.value !== '' ? this.form.get('nLitrosCompra')?.value : 0;
  }

  get nTipoCambio(): number {
    return this.form.get('nTipoCambio')?.value !== '' ? this.form.get('nTipoCambio')?.value : 0;
  }

  get nCostoTotal(): number {
    return this.form.get('nCostoTotal')?.value !== '' ? this.form.get('nCostoTotal')?.value : 0;
  }

  get nCostoFactura(): number {
    return this.form.get('nCostoFactura')?.value !== '' ? this.form.get('nCostoFactura')?.value : 0;
  }

  get nCostoFlete(): number {
    return this.form.get('nCostoFlete')?.value !== '' ? this.form.get('nCostoFlete')?.value : 0;
  }

  get nCostoCruce(): number {
    return this.form.get('nCostoCruce')?.value !== '' ? this.form.get('nCostoCruce')?.value : 0;
  }

  get nGalonesCompra(): number {
    return this.form.get('nGalonesCompra')?.value !== '' ? this.form.get('nGalonesCompra')?.value : 0;
  }

  get nCostoGalon(): number {
    return this.form.get('nCostoGalon')?.value !== '' ? this.form.get('nCostoGalon')?.value : 0;
  }

  get cTicket(): string {
    return this.form.get('cTicket')?.value !== '' ? this.form.get('cTicket')?.value : 0;
  }

  cambiarTipoCompra() {
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


    }
  }

  async guardar(): Promise<void> {

    this.util.dialogConfirm('¿Está seguro que desea guardar los datos?').then((result) => {

      if (result.isConfirmed) {

        const obj = {
            nCompra : this.nCompra,
            cTipoCompra : this.cTipoCompra,
            nEmpresa : this.nEmpresa,
            nAlmacen : this.nAlmacen,
            nProveedor : this.nProveedor,
            dFechaFactura : new Date(this.dFechaFactura).toISOString().split('T')[0],
            cFactura : this.cFactura,
            nFletera : this.nFletera,
            nChofer : this.nChofer,
            cNumeroTrailer : this.cNumeroTrailer,
            nArticulo : this.nArticulo,
            cFuller1 : this.cFuller1,
            cFuller2 : this.cFuller2,
            cSellos1 : this.cSellos1,
            cSellos2 : this.cSellos2,
            nLitrosCompra : this.nLitrosCompra,
            nTipoCambio : this.nTipoCambio,
            nCostoTotal : this.nCostoTotal,
            nCostoCruce: this.cTipoCompra === 'I' ? this.nCostoCruce : null,
            nCostoFactura: this.cTipoCompra === 'I' ? this.nCostoFactura : null,
            dFechaCompra: new Date().toISOString().split('T')[0],
            nCostoFlete : this.nCostoFlete,
            cTicket: this.cTipoCompra === 'I' ? this.cTicket : null,
            nLitrosRecepcion: this.nLitrosCompra,
            nGalonesCompra: this.cTipoCompra === 'I' ? this.nGalonesCompra : null,
            nCostoGalon: this.cTipoCompra === 'I' ? this.nCostoGalon : null,
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
          // if(err.error.error.type){
          //   this.util.dialogError(err.error.error.type);
          // }else{
          //   this.util.dialogError('Error al guardar la empresa.');
          // }
          this.util.dialogError('Error al guardar la compra.');

        });
      }
    });

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
        if(value && value.id){
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

    const data = empresasResp.data.map( (item: any) => { return {nEmpresa: item.nEmpresa, cNombreEmpresa: item.cNombreEmpresa} });

    modalRef.componentInstance.data = data;
    modalRef.componentInstance.dataTemp = data;

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if(value && value.id){
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

    const data = almacenResp.data.map( (item: any) => { return {nAlmacen: item.nAlmacen, cDescripcion: item.cDescripcion} });

    modalRef.componentInstance.data = data;
    modalRef.componentInstance.dataTemp = data;

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if(value && value.id){
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

    const proveedorResp = await this.serviceProveedor.obtenerProveedores(0).toPromise();

    const data = proveedorResp.data.map( (item: any) => { return {nProveedor: item.nProveedor, cDescripcion: item.cNombreProveedor} });

    modalRef.componentInstance.data = data;
    modalRef.componentInstance.dataTemp = data;

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if(value && value.id){
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

    const data = fleteraResp.data.map( (item: any) => { return {nFletera: item.nFletera, cDescripcion: item.cDescripcion} });

    modalRef.componentInstance.data = data;
    modalRef.componentInstance.dataTemp = data;

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if(value && value.id){
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

    const choferResp = await this.serviceChofer.obtenerChoferes(0).toPromise();

    const data = choferResp.data.map( (item: any) => { return {nChofer: item.nChofer, cDescripcion: item.cNombreChofer} });

    modalRef.componentInstance.data = data;
    modalRef.componentInstance.dataTemp = data;

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if(value && value.id){
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

    const articuloResp = await this.serviceArticulo.obtenerArticulos(0).toPromise();

    const data = articuloResp.data.map( (item: any) => { return {nArticulo: item.nArticulo, cDescripcion: item.cDescripcionLarga} });

    modalRef.componentInstance.data = data;
    modalRef.componentInstance.dataTemp = data;

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if(value && value.id){
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
    this.service.obtenerCompras(this.nCompra).subscribe ( (resp: any) => {
      if (resp) {
        const compra = resp.data[0];

        this.form.controls["nCompra"].setValue(compra.nCompra);
        this.form.controls["cTipoCompra"].setValue(compra.cTipoCompra);
        this.form.controls["cEmpresa"].setValue(compra.cEmpresa);
        this.form.controls["nEmpresa"].setValue(compra.nEmpresa);
        this.form.controls["nAlmacen"].setValue(compra.nAlmacen);
        this.form.controls["cAlmacen"].setValue(compra.cAlmacen);
        this.form.controls["nProveedor"].setValue(compra.nProveedor);
        this.form.controls["cProveedor"].setValue(compra.cProveedor);
        this.form.controls["dFechaFactura"].setValue(new Date(compra.dFechaFactura).toISOString().split('T')[0]);
        this.form.controls["cFactura"].setValue(compra.cFactura);
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
        this.form.controls["nLitrosCompra"].setValue(parseFloat(compra.nLitrosCompra));
        this.form.controls["nTipoCambio"].setValue(parseFloat(compra.nTipoCambio));
        this.form.controls["nCostoFactura"].setValue(parseFloat(compra.nCostoFactura));
        this.form.controls["nCostoFlete"].setValue(parseFloat(compra.nCostoFlete));
        this.form.controls["nCostoCruce"].setValue(parseFloat(compra.nCostoCruce));
        this.form.controls["nGalonesCompra"].setValue(parseFloat(compra.nGalonesCompra));
        this.form.controls["nCostoGalon"].setValue(parseFloat(compra.nCostoGalon));

        this.form.controls["cTipoCompra"].disable();

        this.calcularTotales();
      }
    }, (error: any) => {

    });
  }

  calcularTotales() {

    if (this.cTipoCompra !== 'I') {
      const total = this.nLitrosCompra  * this.nTipoCambio;
      let final = (total + this.nCostoFlete) / this.nLitrosCompra;

      if (isNaN(final)) {
        final = 0;
      }

      this.form.controls["nCostoTotal"].setValue(total);
      this.form.controls["nCostoFinalLitro"].setValue(final);

    } else {

      const nValorGalon = 3.785;

      const litrosGalones = this.nGalonesCompra * nValorGalon;
      this.form.controls["nLitrosCompra"].setValue(litrosGalones);

      const totalDolares = this.nCostoGalon * this.nGalonesCompra;
      this.form.controls["nCostoFinalDolares"].setValue(totalDolares);

      const totalPesos = litrosGalones * this.nTipoCambio;
      this.form.controls["nCostoTotal"].setValue(totalPesos);

      const totales = totalPesos + this.nCostoCruce + this.nCostoFactura + this.nCostoFlete;

      let final = totales / this.nLitrosCompra;
      this.form.controls["nCostoFinalLitro"].setValue(final);

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

    this.form.controls["cTipoCompra"].enable();

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

}
