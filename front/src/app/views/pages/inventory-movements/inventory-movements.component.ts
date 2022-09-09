import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as dayjs from 'dayjs';
import { AlmacenService } from 'src/services/almacen.service';
import { ArticulosService } from 'src/services/articulos.service';
import { InventariosService } from 'src/services/inventarios.service';
import { UtilsService } from 'src/services/utils.service';
import { BusquedaModalComponent } from '../busquedas/busqueda-modal/busqueda-modal.component';

@Component({
  selector: 'app-inventory-movements',
  templateUrl: './inventory-movements.component.html',
  styleUrls: ['./inventory-movements.component.scss'],
  preserveWhitespaces: true
})
export class InventoryMovementsComponent implements OnInit {
  form: FormGroup;
  maxDate = new Date();
  constructor(private util: UtilsService,
    private formBuilder: FormBuilder, private inventario: InventariosService,
    private serviceArticulo: ArticulosService,
    public modalService: NgbModal,
    private serviceAlmacen: AlmacenService,) { }

  ngOnInit(): void {

    let today = dayjs(new Date().toISOString().split('T')[0]).format('YYYY-MM-DD')
    this.form = new FormGroup({
      nMovimientoAlmacen : new FormControl({ value: '', disabled: true }, []),
      nArticulo : new FormControl('', Validators.required),
      cArticulo : new FormControl({ value: '', disabled: true }, Validators.required),
      nAlmacen : new FormControl('', Validators.required),
      cAlmacen : new FormControl({ value: '', disabled: true }, Validators.required),
      nCantidadMovimiento : new FormControl(0, Validators.required),
      dFechaMovimiento : new FormControl(today, [Validators.required]),
    });
  }
  get nMovimientoAlmacen(): number {
    if (!this.form.get('nMovimientoAlmacen')?.value ||  this.form.get('nMovimientoAlmacen')?.value == ''){
      return 0;
    }
    return this.form.get('nCompra')?.value;
  }
  get nArticulo(): number {
    return this.form.get('nArticulo')?.value ?? 0;
  }
  get nAlmacen(): number {
    return this.form.get('nAlmacen')?.value ?? 0;
  }
  get nCantidadMovimiento(): number {
    return this.form.get('nCantidadMovimiento')?.value ?? 0;
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
  asignarArticulo(value: any) {
    this.form.controls["cArticulo"].setValue(value.cDescripcion);
    this.form.controls["nArticulo"].setValue(value.id);
  }

  asignarAlmacen(value: any) {
    this.form.controls["cAlmacen"].setValue(value.cDescripcion);
    this.form.controls["nAlmacen"].setValue(value.id);
  }
}
