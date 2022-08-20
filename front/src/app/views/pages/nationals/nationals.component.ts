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
      cTipoCompra : new FormControl('N', Validators.required),  
      cEmpresa : new FormControl({value: '', disabled: true}, Validators.required), 
      nEmpresa : new FormControl('', Validators.required),  
      nAlmacen : new FormControl('', Validators.required),  
      cAlmacen : new FormControl({ value: '', disabled: true }, Validators.required),  
      nProveedor : new FormControl('', Validators.required),  
      cProveedor : new FormControl({ value: '', disabled: true }, Validators.required),
      dFechaFactura : new FormControl('', Validators.required),
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
      nCostoTotal : new FormControl({ value: '', disabled: true }, Validators.required),  
      // nCostoCruce : new FormControl('', Validators.required),  
      nCostoFactura : new FormControl('', Validators.required),  
      nCostoFlete : new FormControl('', Validators.required),  
      // dFechaCompra : new FormControl('', Validators.required),  
    });
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
    return this.form.get('nLitrosCompra')?.value ?? 0;
  }

  get nTipoCambio(): number {
    return this.form.get('nTipoCambio')?.value ?? 0;
  }

  get nCostoTotal(): number {
    return this.nLitrosCompra ?? 0 * this.nTipoCambio ?? 0;
  }

  get nCostoFactura(): number {
    return this.form.get('nCostoFactura')?.value ?? 0;
  }

  get nCostoFlete(): number {
    return this.form.get('nCostoFlete')?.value ?? 0;
  }

  get nCostoCruce(): number {
    return this.form.get('nCostoCruce')?.value ?? 0;
  }

  async guardar(): Promise<void> {

    this.util.dialogConfirm('¿Está seguro que desea guardar los datos?').then((result) => {

      if (result.isConfirmed) {

        const obj = {
            nCompra : this.nCompra,
            cTipoCompra : 'N', //this.cTipoCompra,
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
            nCostoCruce: 0,
            nCostoFactura: 0,
            dFechaCompra: new Date().toISOString().split('T')[0],
            nCostoFlete : this.nCostoFlete,
            cTicket: '',
            nLitrosRecepcion: this.nLitrosCompra
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
    const modalRef = this.modalService.open(BusquedaFleteraComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'dialog-formulario-chico',
    });

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if(value){
          this.form.controls["nFletera"].setValue(value.id);
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
        if(value){
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
        if(value){
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
        if(value){
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
        if(value){
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
        if(value){
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
        if(value){
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
    this.service.obtenerCompras(this.nFletera).subscribe ( (resp: any) => {
      if (resp) {
        const fletera = resp.data[0];
        this.form.controls["nFletera"].setValue(fletera.nFletera);
        this.form.controls["cDescripcion"].setValue(fletera.cDescripcion);
        this.form.controls["cTelefono"].setValue(fletera.cTelefono); 
        this.form.controls["cContacto"].setValue(fletera.cContacto); 
        this.form.controls["cCorreoElectronico"].setValue(fletera.cCorreoElectronico); 
      }
    }, (error: any) => {

    });
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
    // this.form.controls["nCostoCruce"].setValue('');
    this.form.controls["nCostoFactura"].setValue('');
    this.form.controls["nCostoFlete"].setValue('');

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
