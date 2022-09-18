import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as dayjs from 'dayjs';
import { AlmacenService } from 'src/services/almacen.service';
import { ArticulosService } from 'src/services/articulos.service';
import { InventariosService } from 'src/services/inventarios.service';
import { UtilsService } from 'src/services/utils.service';
import Swal from 'sweetalert2';
import { BusquedaModalComponent } from '../busquedas/busqueda-modal/busqueda-modal.component';
import { BusquedaInventoryMovementsComponent } from './busqueda-inventory-movements/busqueda-inventory-movements.component';

@Component({
  selector: 'app-inventory-movements',
  templateUrl: './inventory-movements.component.html',
  styleUrls: ['./inventory-movements.component.scss'],
  preserveWhitespaces: true,
  providers: [DatePipe]
})
export class InventoryMovementsComponent implements OnInit {
  form: FormGroup;
  maxDate = new Date();
  tiposDeMovimientos: any = [];
  bTraspaso: boolean = false;
  constructor(private util: UtilsService,
    private formBuilder: FormBuilder, private inventario: InventariosService,
    private serviceArticulo: ArticulosService,
    public modalService: NgbModal,
    private serviceAlmacen: AlmacenService,
    private serviceInventario: InventariosService,
    private datePipe: DatePipe) { }

  async ngOnInit(): Promise<void> {

    this.form = new FormGroup({
      nMovimientoAlmacen: new FormControl({ value: '', disabled: true }, []),
      nArticulo: new FormControl('', Validators.required),
      nTipoMovimiento: new FormControl('', Validators.required),
      cArticulo: new FormControl({ value: '', disabled: true }, Validators.required),
      nAlmacenOrigen: new FormControl(''),
      cAlmacenOrigen: new FormControl({ value: '', disabled: true }),
      nAlmacenDestino: new FormControl('', Validators.required),
      cAlmacenDestino: new FormControl({ value: '', disabled: true }),
      nCantidadMovimiento: new FormControl(0, Validators.required),
      dFechaMovimiento: new FormControl(this.datePipe.transform(new Date(), 'yyyy-MM-dd'), [Validators.required]),
      nCosto: new FormControl(0, Validators.required),
      cObservaciones: new FormControl(''),

    });

    let tiposDeMovimientosTemp = await this.serviceInventario.obtenerTiposDeMovimientos(0).toPromise();
    if (tiposDeMovimientosTemp.data) {
      this.tiposDeMovimientos = tiposDeMovimientosTemp.data;
    } else {
      this.tiposDeMovimientos = [];
    }

    this.form.get('nTipoMovimiento')?.valueChanges.subscribe(val => {
      if (val.bTraspaso == 0) {
        this.bTraspaso = false;
        this.form.get('nAlmacenOrigen')?.clearValidators();
        this.form.get('nAlmacenOrigen')?.updateValueAndValidity();
      } else {
        this.bTraspaso = true;
        this.form.get('nAlmacenOrigen')?.setValidators([Validators.required]);
        this.form.get('nAlmacenOrigen')?.updateValueAndValidity();
      }
    });
  }
  get nMovimientoAlmacen(): number {
    if (!this.form.get('nMovimientoAlmacen')?.value || this.form.get('nMovimientoAlmacen')?.value == '') {
      return 0;
    }
    return this.form.get('nMovimientoAlmacen')?.value;
  }
  get nArticulo(): number {
    return this.form.get('nArticulo')?.value ?? 0;
  }
  get nAlmacenOrigen(): number {
    return this.form.get('nAlmacenOrigen')?.value ?? 0;
  }
  get nAlmacenDestino(): number {
    return this.form.get('nAlmacenDestino')?.value ?? 0;
  }
  get nCantidadMovimiento(): number {
    return this.form.get('nCantidadMovimiento')?.value ?? 0;
  }
  get nCosto(): number {
    return this.form.get('nCosto')?.value ?? 0;
  }
  get nTipoMovimiento(): any {
    return this.form.get('nTipoMovimiento')?.value ?? {};
  }

  get dFechaMovimiento(): any {
    return this.form.get('dFechaMovimiento')?.value;
  }

  get cObservaciones(): string {
    return this.form.get('cObservaciones')?.value ?? '';
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


  openMovimiento() {
    const modalRef = this.modalService.open(BusquedaInventoryMovementsComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'dialog-formulario',
    });

    modalRef.closed.subscribe(
      value => {
        if (value) {
          console.log(value.id);
          this.form.controls["nMovimientoAlmacen"].setValue(value.id);
          if (value.id != 0) {
            this.mostrarDatos()
          }
        }
        // this.enfocarBotonNuevaVenta()

      }
    );
  }
  async openModalAlmacenesOrigen() {
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
          this.asignarAlmacenOrigen(value);
          modalRef.close();
        }
      }
    );
  }

  async openModalAlmacenesDestino() {
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
          this.asignarAlmacenDestino(value);
          modalRef.close();
        }
      }
    );
  }
  asignarArticulo(value: any) {
    this.form.controls["cArticulo"].setValue(value.cDescripcion);
    this.form.controls["nArticulo"].setValue(value.id);
  }

  asignarAlmacenOrigen(value: any) {
    this.form.controls["cAlmacenOrigen"].setValue(value.cDescripcion);
    this.form.controls["nAlmacenOrigen"].setValue(value.id);
  }

  asignarAlmacenDestino(value: any) {
    this.form.controls["cAlmacenDestino"].setValue(value.cDescripcion);
    this.form.controls["nAlmacenDestino"].setValue(value.id);
  }


  async guardar() {

    let tempAlmacenOrigen;
    if (this.nAlmacenOrigen == 0) {
      tempAlmacenOrigen = this.nAlmacenDestino;
    } else {
      tempAlmacenOrigen = this.nAlmacenOrigen;
    }
    const objEncabezado = {
      nTipoMovimiento: this.nTipoMovimiento.nTipoMovimiento,
      nAlmacenRegistro: tempAlmacenOrigen,
      nAlmacenMovimiento: this.nAlmacenDestino,
      dFechaMovimiento: new Date(this.dFechaMovimiento).toISOString().split('T')[0],
      cReferencia: this.cObservaciones,
      detalle: [
        {
          nTipoMovimiento: this.nTipoMovimiento.nTipoMovimiento,
          nRenglon: 1,
          nArticulo: this.nArticulo,
          nCantidadMovimiento: this.nCantidadMovimiento,
          nCosto: this.nCosto,
          nPrecio: this.nCosto
        }
      ]
    };
    await this.serviceInventario.guardarMovimientoAlmacen(objEncabezado).subscribe(async (resp: any) => {

      if (resp.error !== '') {

        Swal.fire('Error', resp.error.error, 'error');
      }
      else {
        this.limpiar();
        this.util.dialogSuccess('Movimiento de inventario guardado correctamente.');
      }
    }, (err: { error: any; }) => {
      if (err.error.error.original.sqlMessage) {
        this.util.dialogError('Error al guardar el movimiento de inventario.' + err.error.error.original.sqlMessage);
      } else {
        this.util.dialogError('Error al guardar el movimiento de inventario.');
      }

    });
  }

  mostrarDatos() {
    console.log(this.nMovimientoAlmacen);
    console.log(this.tiposDeMovimientos);
    this.serviceInventario.obtenerMovimientoDeAlmacen(this.nMovimientoAlmacen).subscribe((resp: any) => {
      if (resp) {
        const movimiento = resp.data[0];
        console.log(movimiento);
        let tipoMov = this.tiposDeMovimientos.filter((mov: { nTipoMovimiento: any; }) => mov.nTipoMovimiento == movimiento.nTipoMovimiento)
        if (tipoMov.length) {
          this.form.controls["nTipoMovimiento"].setValue(tipoMov[0]);
          this.form.controls["nArticulo"].setValue(movimiento.nArticulo);
          this.form.controls["cArticulo"].setValue(movimiento.cDescripcionCorta);
          this.form.controls["nCantidadMovimiento"].setValue(movimiento.nCantidadMovimiento);
          this.form.controls["dFechaMovimiento"].setValue(dayjs(new Date(movimiento.dFechaMovimiento).toISOString().split('T')[0]).format('YYYY-MM-DD'));
          this.form.controls["nAlmacenOrigen"].setValue(movimiento.nAlmacenRegistro);
          this.form.controls["cAlmacenOrigen"].setValue(movimiento.cDescripcionAlmacenRegistro);
          this.form.controls["cAlmacenDestino"].setValue(movimiento.cDescripcionAlmacen);
          this.form.controls["nAlmacenDestino"].setValue(movimiento.nAlmacen);
          this.form.controls["nCosto"].setValue(movimiento.nCostoUnitario);
          this.form.controls["cObservaciones"].setValue(movimiento.cReferencia);
        }
      }
    }, (error: any) => {

    });
  }
  limpiar() {


    this.form.controls["nMovimientoAlmacen"].setValue('');
    this.form.controls["nArticulo"].setValue('');
    this.form.controls["nTipoMovimiento"].setValue('');
    this.form.controls["cArticulo"].setValue('');
    this.form.controls["nAlmacenOrigen"].setValue('');
    this.form.controls["cAlmacenOrigen"].setValue('');
    this.form.controls["cAlmacenDestino"].setValue('');
    this.form.controls["nAlmacenDestino"].setValue('');
    this.form.controls["nCantidadMovimiento"].setValue(0);
    this.form.controls["dFechaMovimiento"].setValue(this.datePipe.transform(new Date(), 'yyyy-MM-dd'));
    this.form.controls["nCosto"].setValue(0);
    this.form.controls["cObservaciones"].setValue('');
    this.bTraspaso = false;
  }
  cancelar() {

  }
}
