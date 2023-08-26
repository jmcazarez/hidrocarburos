import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as dayjs from 'dayjs';
import { ArticulosService } from 'src/services/articulos.service';
import { ChoferesService } from 'src/services/choferes.service';
import { ClienteService } from 'src/services/cliente.service';
import { EmpleadosService } from 'src/services/empleados.service';
import { EmpresaService } from 'src/services/empresa.service';
import { FormasPagoService } from 'src/services/formas-pago.service';
import { PdfService } from 'src/services/pdf.service';
import { UtilsService } from 'src/services/utils.service';
import { VentasService } from 'src/services/ventas.service';
import { Patterns } from 'src/utils/patterns';
import { BusquedaModalComponent } from '../busquedas/busqueda-modal/busqueda-modal.component';

@Component({
  selector: 'app-product-delivery-ticket',
  templateUrl: './product-delivery-ticket.component.html',
  styleUrls: ['./product-delivery-ticket.component.scss'],
  preserveWhitespaces: true
})
export class ProductDeliveryTicketComponent implements OnInit {

  form: FormGroup;
  ventas: any[] = [];
  maxDate = new Date();

  constructor(
    private service: VentasService,
    private util: UtilsService,
    public modalService: NgbModal,
    private patterns: Patterns,
    private serviceEmpresa: EmpresaService,
    private serviceChofer: ChoferesService,
    private serviceArticulo: ArticulosService,
    private serviceFormasPago: FormasPagoService,
    private serviceEmpleados: EmpleadosService,
    private serviceClientes: ClienteService,
    private pdfService: PdfService
  ) { }

  async ngOnInit(): Promise<void> {
    this.form = new FormGroup({
      nVenta: new FormControl({ value: '', disabled: true }, []),
      // cFolioExterno : new FormControl('', [Validators.required]),
      dFechaVenta: new FormControl(dayjs().format('YYYY-MM-DD'), [Validators.required]),
      cOrigen: new FormControl({ value: '', disabled: true }, Validators.required),
      nOrigen: new FormControl('', Validators.required),
      nDestino: new FormControl('', Validators.required),
      cDestino: new FormControl({ value: '', disabled: true }, Validators.required),
      nVendedor: new FormControl('', Validators.required),
      cVendedor: new FormControl({ value: '', disabled: true }, Validators.required),
      cEquipo: new FormControl('', [Validators.required]),
      cPlaca: new FormControl('', [Validators.required]),
      cChofer: new FormControl({ value: '', disabled: true }, Validators.required),
      nChofer: new FormControl('', Validators.required),
      nArticulo: new FormControl('', Validators.required),
      cArticulo: new FormControl({ value: '', disabled: true }, Validators.required),
      nFormaPago: new FormControl(''),
      cFormaPago: new FormControl({ value: '', disabled: true }),
      nCantidadEnviada: new FormControl('', [Validators.required]),
      nCantidadRecibida: new FormControl('', [Validators.required]),
      nCostoLitro: new FormControl('', [Validators.required]),
      nTotal: new FormControl({ value: '', disabled: true }, Validators.required),
      nAnticipo: new FormControl('', []),
      cObservaciones: new FormControl('', []),
      cEncargado: new FormControl('', [Validators.required])
    });
    this.obtener();
  }

  get nVenta(): number {
    if (!this.form.get('nVenta')?.value || this.form.get('nVenta')?.value == '') {
      return 0;
    }
    return this.form.get('nVenta')?.value;
  }

  get dFechaVenta(): any {
    return this.form.get('dFechaVenta')?.value;
  }

  get nOrigen(): number {
    return this.form.get('nOrigen')?.value ?? 0;
  }

  get nDestino(): number {
    return this.form.get('nDestino')?.value ?? 0;
  }

  get nVendedor(): number {
    return this.form.get('nVendedor')?.value ?? 0;
  }

  get nChofer(): number {
    return this.form.get('nChofer')?.value;
  }

  get cEquipo(): string {
    return this.form.get('cEquipo')?.value ?? '';
  }

  get cPlaca(): string {
    return this.form.get('cPlaca')?.value ?? '';
  }

  get nArticulo(): number {
    return this.form.get('nArticulo')?.value ?? 0;
  }

  get nCantidadEnviada(): number {
    return this.form.get('nCantidadEnviada')?.value ?? '';
  }

  get nCantidadRecibida(): number {
    return this.form.get('nCantidadRecibida')?.value ?? '';
  }

  get nCostoLitro(): number {
    return this.form.get('nCostoLitro')?.value ?? '';
  }

  get nTotal(): number {
    return this.form.get('nTotal')?.value ?? '';
  }

  get nAnticipo(): number {
    return this.form.get('nAnticipo')?.value ?? '';
  }

  get nFormaPago(): number {
    return this.form.get('nFormaPago')?.value ?? '';
  }

  get cEncargado(): string {
    return this.form.get('cEncargado')?.value ?? '';
  }

  get cObservaciones(): string {
    return this.form.get('cObservaciones')?.value ?? '';
  }

  get cFolioExterno(): string {
    return this.form.get('cFolioExterno')?.value ?? '';
  }

  calcularTotal() {
    const total = this.nCantidadEnviada * this.nCostoLitro;
    this.form.get('nTotal')?.setValue(total);
    return total;
  }

  async obtener() {
    this.service.obtenerVentas(0).subscribe((resp: any) => {
      this.ventas = resp.data;
      this.ventas.sort((a, b) => (a.nVenta > b.nVenta ? -1 : 1));
      this.ventas = this.ventas.slice(0, 10);
    }, (error: any) => {
      this.util.dialogError('Ocurrió un error al obtener las ventas.');
    })
  }

  async guardar(): Promise<void> {

    this.util.dialogConfirm('¿Está seguro que desea guardar los datos?').then((result) => {

      if (result.isConfirmed) {

        // validar la fecha de compra

        let fechaVenta = dayjs(this.dFechaVenta);

        let fechaActual = dayjs();

        if (fechaVenta > fechaActual) {
          this.util.dialogWarning('La fecha de venta no debe ser mayor a la fecha actual.');
          return;
        }

        if (this.nAnticipo > 0 && (!this.nFormaPago || this.nFormaPago <=0 )) {
          this.util.dialogWarning('Debe proporcionar una forma de pago.');
          return;
        }

        const obj = {
          nVenta: this.nVenta,
          cFolioExterno: '', // this.cFolioExterno,
          dFechaVenta: this.dFechaVenta,
          nOrigen: this.nOrigen,
          nDestino: this.nDestino,
          nVendedor: this.nVendedor,
          nChofer: this.nChofer,
          cEquipo: this.cEquipo,
          cPlaca: this.cPlaca,
          nArticulo: this.nArticulo,
          nCantidadEnviada: this.nCantidadEnviada,
          nCantidadRecibida: this.nCantidadRecibida,
          nCostoLitro: this.nCostoLitro,
          nAnticipo: this.nAnticipo,
          nFormaPago: this.nFormaPago,
          cEncargado: this.cEncargado,
          cObservaciones: this.cObservaciones,
          nTotal: this.calcularTotal()
        };

        this.service.guardarVenta(obj).subscribe(async (resp: any) => {

          if (resp.error !== '') {

            this.util.dialogError(resp.error.error.type);
          }
          else {
            this.limpiar();
            this.util.dialogSuccess('Venta guardada correctamente.');
            this.obtener();
          }
        }, (err: { error: any; }) => {
          if (err.error.error) {
            this.util.dialogError(err.error.error);
          } else {
            this.util.dialogError('Error al guardar la venta.');
          }

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


  async openModalEmpresas(nTipo: number) {
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
          if (nTipo === 1) {
            this.asignarOrigen(value);
          } else {
            this.asignarDestino(value);
          }
          modalRef.close();
        }
      }
    );
  }

  asignarOrigen(value: any) {
    this.form.controls["cOrigen"].setValue(value.cDescripcion);
    this.form.controls["nOrigen"].setValue(value.id);
  }

  asignarDestino(value: any) {
    this.form.controls["cDestino"].setValue(value.cDescripcion);
    this.form.controls["nDestino"].setValue(value.id);
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

    const choferResp = await this.serviceChofer.obtenerChoferes(0, -1).toPromise();

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

    const data = empResp.data.map((item: any) => { return { nEmpleado: item.nEmpleado, cDescripcion: item.cNombreEmpleado } });

    modalRef.componentInstance.data = data;
    modalRef.componentInstance.dataTemp = data;

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if (value && value.id) {
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

    const data = cliResp.data.map((item: any) => { return { nCliente: item.nCliente, cDescripcion: item.cNombreCliente } });

    modalRef.componentInstance.data = data;
    modalRef.componentInstance.dataTemp = data;

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if (value && value.id) {
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

  async openModalFormasPago() {
    const modalRef = this.modalService.open(BusquedaModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'dialog-formulario-chico',
    });

    modalRef.componentInstance.titulo = 'Búsqueda de formas de pago';

    modalRef.componentInstance.props = [{
      cNombre: 'Folio',
      cPropiedad: 'nFormaPago'
    },
    {
      cNombre: 'Forma de pago',
      cPropiedad: 'cDescripcion'
    }
    ];

    const frmResp = await this.serviceFormasPago.obtenerFormasPago().toPromise();

    const data = frmResp.data.map((item: any) => { return { nFormaPago: item.nFormaPago, cDescripcion: item.cDescripcion } });

    modalRef.componentInstance.data = data;
    modalRef.componentInstance.dataTemp = data;

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if (value && value.id >= 0) {
          this.asignarFormaPago(value);
          modalRef.close();
        }
      }
    );
  }

  asignarFormaPago(value: any) {
    this.form.controls["cFormaPago"].setValue(value.cDescripcion);
    this.form.controls["nFormaPago"].setValue(value.id);
  }

  limpiar() {
    this.form.controls["nVenta"].setValue('');
    // this.form.controls["cFolioExterno"].setValue('');
    this.form.controls["dFechaVenta"].setValue('');
    this.form.controls["nOrigen"].setValue('');
    this.form.controls["cOrigen"].setValue('');
    this.form.controls["nDestino"].setValue('');
    this.form.controls["cDestino"].setValue('');
    this.form.controls["nVendedor"].setValue('');
    this.form.controls["cVendedor"].setValue('');
    this.form.controls["cEncargado"].setValue('');
    this.form.controls["nChofer"].setValue('');
    this.form.controls["cChofer"].setValue('');
    this.form.controls["cEquipo"].setValue('');
    this.form.controls["cPlaca"].setValue('');
    this.form.controls["nArticulo"].setValue('');
    this.form.controls["cArticulo"].setValue('');
    this.form.controls["cObservaciones"].setValue('');
    this.form.controls["nCantidadEnviada"].setValue('');
    this.form.controls["nCantidadRecibida"].setValue('');
    this.form.controls["nCostoLitro"].setValue('');
    this.form.controls["nTotal"].setValue('');
    this.form.controls["nAnticipo"].setValue('');
    this.form.controls["nFormaPago"].setValue('');
    this.form.controls["cFormaPago"].setValue('');
  }

  async imprimir() {
   await this.service.obtenerTicketVenta().subscribe(async (resp: any) => {
    console.log(resp.data.pdf);
    this.pdfService.visualizarPdf(resp.data.pdf, 'Cotización', true, 'venta-input-articulo', null, null);

    }, (err: { error: any; }) => {
      if (err.error.error) {
        this.util.dialogError(err.error.error);
      } else {
        this.util.dialogError('Error al generar ticket de venta.');
      }

    });
  }
}
