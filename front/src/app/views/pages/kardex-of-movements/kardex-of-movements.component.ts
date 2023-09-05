import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlmacenService } from 'src/services/almacen.service';
import { ArticulosService } from 'src/services/articulos.service';
import { InventariosService } from 'src/services/inventarios.service';
import { UtilsService } from 'src/services/utils.service';
import { BusquedaModalComponent } from '../busquedas/busqueda-modal/busqueda-modal.component';
import * as moment from 'moment';
import { TableUtil } from 'src/utils/tableUtils';

@Component({
  selector: 'app-kardex-of-movements',
  templateUrl: './kardex-of-movements.component.html',
  styleUrls: ['./kardex-of-movements.component.scss'],
  preserveWhitespaces: true
})
export class KardexOfMovementsComponent implements OnInit {

  constructor(
    private util: UtilsService,
    public modalService: NgbModal,
    private serviceAlmacen: AlmacenService,
    private serviceArticulo: ArticulosService,
    private spinner: NgxSpinnerService,
    private serviceInventario: InventariosService
  ) { }
  form: FormGroup;
  tiposDeMovimientos: any = [];
  movimientos: any = [];
  nTotalEntradas = 0;
  nTotalSalidas = 0;
  nExistenciaInicial = 0;
  nExistenciaFinal = 0;
  async ngOnInit(): Promise<void> {
    this.form = new FormGroup({
      nAlmacen: new FormControl('', []),
      cAlmacen: new FormControl({ value: '', disabled: true }, Validators.required),
      nArticulo: new FormControl('', Validators.required),
      cArticulo: new FormControl({ value: '', disabled: true }, Validators.required),
      dFechaInicio: new FormControl('', []),
      dFechaFin: new FormControl('', []),
      nTipoMovimiento: new FormControl(''),
    });

    let tiposDeMovimientosTemp = await this.serviceInventario.obtenerTiposDeMovimientos(-1).toPromise();
    if (tiposDeMovimientosTemp.data) {
      this.tiposDeMovimientos = tiposDeMovimientosTemp.data;
    } else {
      this.tiposDeMovimientos = [];
    }

  }

  get nAlmacen(): number {
    if (!this.form.get('nAlmacen')?.value || this.form.get('nAlmacen')?.value == '') {
      return 0;
    }
    return this.form.get('nAlmacen')?.value;
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

  get nTipoMovimiento(): any {
    if (!this.form.get('nTipoMovimiento')?.value || this.form.get('nTipoMovimiento')?.value == '') {
      return 0;
    }
    return this.form.get('nTipoMovimiento')?.value;
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

  limpiar() {
    this.form.controls["nAlmacen"].setValue('');
    this.form.controls["cAlmacen"].setValue('');
    this.form.controls["dFechaInicio"].setValue('');
    this.form.controls["dFechaFin"].setValue('');
    this.form.controls["nArticulo"].setValue('');
    this.form.controls["cArticulo"].setValue('');
    this.form.controls["nTipoMovimiento"].setValue('');

    this.movimientos = [];

    this.nTotalEntradas = 0;
    this.nTotalSalidas = 0;
    this.nExistenciaInicial = 0;
    this.nExistenciaFinal = 0;
  }
  /*   <td class="th-border">{{ item.nMovimientoAlmacen }}</td>
    <td class="th-border">{{ item.cDescripcionMovimiento }}</td>
    <td class="th-border">{{ item.cDescripcionAlmacen}}</td>
    <td class="th-border">{{ item.cDescripcionAlmacenRegistro }}</td>
    <td class="th-border">{{ item.cFechaMovimiento }}</td>
    <td class="th-border text-end">{{ item.nEfecto == 1 ? item.nCantidadMovimiento : 0 | number : '1.2-2' }}
    </td>
    <td class="th-border text-end">{{ item.nEfecto == -1 ? item.nCantidadMovimiento : 0 | number : '1.2-2' 
      <th class=" th-border">Folio</th>
                  <th class=" th-border">Tipo</th>
                  <th class=" th-border">Almacen Origen</th>
                  <th class=" th-border">Almacen Destino</th>
                  <th class=" th-border">Fecha de movimiento</th>
                  <th class=" th-border">Cantidad Entrada</th>
                  <th class=" th-border">Cantidad Salida</th>
    */
  exportarExcel() {
    let vm = this;
    let headers = [
      ["Folio", "Tipo ", "Almacen involucrado", "Fecha de movimiento", "Cantidad Entrada", "Cantidad Salida"],
    ];
    let data = this.movimientos.map(function (item: any) {
      return {
        folio: item.nMovimientoAlmacen,
        cDescripcionMovimiento: item.cDescripcionMovimiento,
        cDescripcionAlmacenRegistro: item.cDescripcionAlmacenRegistro,
        cFechaMovimiento: item.cFechaMovimiento,
        nCantidadEntrada: item.nEfecto == 1 ? Number(item.nCantidadMovimientoOrigen).toFixed(4) : '0.0000' ,
        nCantidadSalida: item.nEfecto == -1 ? Number(item.nCantidadMovimientoOrigen).toFixed(4) : '0.0000'
      };
    });
    let footer: any = {
      folio: '',
      cDescripcionMovimiento: '',
      cDescripcionAlmacenRegistro: '',
      cFechaMovimiento: '',
      nCantidadEntrada: '',
      nCantidadSalida:  '',
    };
    data.push(footer);
    TableUtil.exportArrayToExcel(data, "Reporte_de_kardex_de_articulo", headers, null);
  }
  consultar() {


    let consulta = {
      nAlmacen: this.nAlmacen ?? 0,
      nArticulo: this.nArticulo ?? 0,
      nTipoMovimiento: this.nTipoMovimiento?.nTipoMovimiento ?? 0,
      dFechaInicio: this.dFechaInicio ? new Date(this.dFechaInicio).toISOString().split('T')[0] : '',
      dFechaFin: this.dFechaFin ? new Date(this.dFechaFin).toISOString().split('T')[0] : '',
    }
    this.spinner.show();
    this.serviceInventario.obtenerKardex(
      consulta
    ).subscribe((resp: any) => {
      console.log(resp);
      if (resp) {

        this.movimientos = resp.data.movimientos;

        this.nTotalEntradas = resp.data.nTotalEntradas;
        this.nTotalSalidas = resp.data.nTotalSalidas;
        this.nExistenciaInicial = resp.data.nExistenciaInicial;
        this.nExistenciaFinal = resp.data.nExistenciaFinal;
        console.log('Movimientos:', resp);

      }
      this.spinner.hide();
    }, (error: any) => {
      this.spinner.hide();
    });

  }
}
