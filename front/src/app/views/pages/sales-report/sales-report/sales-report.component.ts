import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as dayjs from 'dayjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlmacenService } from 'src/services/almacen.service';
import { ArticulosService } from 'src/services/articulos.service';
import { ClienteService } from 'src/services/cliente.service';
import { ComprasService } from 'src/services/compras.service';
import { EmpleadosService } from 'src/services/empleados.service';
import { EmpresaService } from 'src/services/empresa.service';
import { ProveedorService } from 'src/services/proveedor.service';
import { UtilsService } from 'src/services/utils.service';
import { VentasService } from 'src/services/ventas.service';
import { Patterns } from 'src/utils/patterns';
import { BusquedaModalComponent } from '../../busquedas/busqueda-modal/busqueda-modal.component';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit {

  form: FormGroup;
  compras = [] as any;
  ventas = [] as any;

  constructor(
    private service: VentasService,
    private util: UtilsService,
    public modalService: NgbModal,
    private patterns: Patterns,
    private serviceEmpresa: EmpresaService,
    private serviceClientes: ClienteService,
    private serviceEmpleados: EmpleadosService,
    private serviceArticulo: ArticulosService,
    private spinner: NgxSpinnerService
  ) {}

  async ngOnInit(): Promise<void> {
    this.form = new FormGroup({
      nVenta : new FormControl('', []),
      nArticulo : new FormControl('', Validators.required),
      cArticulo : new FormControl({ value: '', disabled: true }, []),
      dFechaInicio : new FormControl('', []),
      dFechaFin : new FormControl('', []),
      nVendedor : new FormControl('', Validators.required),
      cVendedor : new FormControl({ value: '', disabled: true }, []),
      nOrigen : new FormControl('', Validators.required),
      cOrigen : new FormControl({ value: '', disabled: true }, []),
      nDestino : new FormControl('', Validators.required),
      cDestino : new FormControl({ value: '', disabled: true }, []),
    });
  }

  get nVenta(): number {
    if (!this.form.get('nVenta')?.value ||  this.form.get('nVenta')?.value == ''){
      return 0;
    }
    return this.form.get('nVenta')?.value;
  }


  get nVendedor(): number {
    if (!this.form.get('nVendedor')?.value ||  this.form.get('nVendedor')?.value == ''){
      return 0;
    }
    return this.form.get('nVendedor')?.value;
  }

  get dFechaInicio(): any {
    return this.form.get('dFechaInicio')?.value;
  }

  get dFechaFin(): any {
    return this.form.get('dFechaFin')?.value;
  }

  get nArticulo(): number {
    if (!this.form.get('nArticulo')?.value ||  this.form.get('nArticulo')?.value == ''){
      return 0;
    }
    return this.form.get('nArticulo')?.value;
  }

  get nOrigen(): number {
    if (!this.form.get('nOrigen')?.value ||  this.form.get('nOrigen')?.value == ''){
      return 0;
    }
    return this.form.get('nOrigen')?.value;
  }

  get nDestino(): number {
    if (!this.form.get('nDestino')?.value ||  this.form.get('nDestino')?.value == ''){
      return 0;
    }
    return this.form.get('nDestino')?.value;
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
    this.form.controls["cOrigen"].setValue(value.cDescripcion);
    this.form.controls["nOrigen"].setValue(value.id);
  }

  async openModalClientes() {
    const modalRef = this.modalService.open(BusquedaModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'dialog-formulario-chico',
    });

    modalRef.componentInstance.titulo = 'Búsqueda de clientes';

    modalRef.componentInstance.props = [{
      cNombre: 'Folio',
      cPropiedad: 'nCliente'
    },
    {
      cNombre: 'Cliente',
      cPropiedad: 'cDescripcion'
    }
    ];

    const cliResp = await this.serviceClientes.obtenerClientes(0).toPromise();

    const data = cliResp.data.map( (item: any) => { return {nCliente: item.nCliente, cDescripcion: item.cNombreCliente} });

    modalRef.componentInstance.data = data;
    modalRef.componentInstance.dataTemp = data;

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if(value && value.id){
          this.asignarCliente(value);
          modalRef.close();
        }
      }
    );
  }

  asignarCliente(value: any) {
    this.form.controls["cDestino"].setValue(value.cDescripcion);
    this.form.controls["nDestino"].setValue(value.id);
  }

  async openModalVendedores() {
    const modalRef = this.modalService.open(BusquedaModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'dialog-formulario-chico',
    });

    modalRef.componentInstance.titulo = 'Búsqueda de vendedores';

    modalRef.componentInstance.props = [{
      cNombre: 'Folio',
      cPropiedad: 'nEmpleado'
    },
    {
      cNombre: 'Vendedor',
      cPropiedad: 'cDescripcion'
    }
    ];

    const empResp = await this.serviceEmpleados.obtenerEmpleados(0).toPromise();

    console.log(empResp);

    const data = empResp.data.map( (item: any) => { return {nEmpleado: item.nEmpleado, cDescripcion: item.cNombreEmpleado} });

    modalRef.componentInstance.data = data;
    modalRef.componentInstance.dataTemp = data;

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if(value && value.id){
          this.asignarEmpleado(value);
          modalRef.close();
        }
      }
    );
  }

  asignarEmpleado(value: any) {
    this.form.controls["cVendedor"].setValue(value.cDescripcion);
    this.form.controls["nVendedor"].setValue(value.id);
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

  

  consultar() {
    this.spinner.show();
    
    this.service.obtenerConsultaVentas(
      this.dFechaInicio ? new Date(this.dFechaInicio).toISOString().split('T')[0] : '',
      this.dFechaFin ? new Date(this.dFechaFin).toISOString().split('T')[0] : '',
      this.nVenta ?? 0,
      this.nOrigen ?? 0,
      this.nDestino ?? 0,
      this.nVendedor ?? 0,
      this.nArticulo ?? 0
    ).subscribe( (resp: any) => {
      this.ventas = resp.data;
      this.spinner.hide();
    }, (error: any) => {
      this.util.dialogError('Ocurrió un error al obtener las ventas.');
      this.spinner.hide();
    })
    
  }

  formatoFecha(fecha: Date){
    return fecha ? dayjs(new Date(fecha).toISOString().split('T')[0]).format('DD/MM/YYYY') : '';
  }

  limpiar() {
    this.form.controls["nVenta"].setValue('');
    this.form.controls["nOrigen"].setValue('');
    this.form.controls["cOrigen"].setValue('');
    this.form.controls["dFechaInicio"].setValue('');
    this.form.controls["dFechaFin"].setValue('');
    this.form.controls["nArticulo"].setValue('');
    this.form.controls["cArticulo"].setValue('');
    this.form.controls["nDestino"].setValue('');
    this.form.controls["cDestino"].setValue('');
    this.form.controls["nVendedor"].setValue('');
    this.form.controls["cVendedor"].setValue('');
    this.ventas = [];
  }


}

