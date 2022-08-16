import { CuentasBancariasService } from '../../../../../services/cuentas_bancarias.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-busqueda-cuentas',
  templateUrl: './busqueda-cuentas.component.html',
  styleUrls: ['./busqueda-cuentas.component.scss']
})
export class BusquedaCuentasComponent implements OnInit {

  data: any[] = [];
  dataTemp: any[] = [];
  loadingIndicator: boolean;
  reorderable: boolean;
  valueBuscador = '';
  selectedRow: any;
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private servicecuentas: CuentasBancariasService) { }

  ngOnInit(): void {
    // Obtener los datos

    this.servicecuentas.obtenerCuentas(0).subscribe( (resp: any) => {
      this.data = resp.data;
      this.dataTemp = [...this.data];
    }, (error: any) => {

    })

  }

  ngAfterViewChecked():void{
    window.dispatchEvent(new Event('resize'));
  }


  close(vm: any = this) {
    vm.activeModal.close({});
  }

  filterDatatable(value: any): void {
    this.data = this.data;
    // Filtramos tabla
    if (value.target.value === "") {
      this.data = this.dataTemp;
    } else {
      const val = value.target.value.toLowerCase();
      const temp = this.data.filter(
        (d) =>
          d.nCuenta.toString().toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d.cNombreCorto.toLowerCase().indexOf(val) !== -1 ||
          !val ||
          String(d.nNumeroCuenta).toLowerCase().indexOf(val) !== -1 ||
          d.cNombreEmpresa.toLowerCase().indexOf(val) !== -1 ||
          !val
      );

      this.data = temp;
    }
  }

  onClick(event: any) {
    if (event.type == 'click') {
      if (this.selectedRow) {
        if (this.selectedRow.nCuenta == event.row.nCuenta) {
          this.activeModal.close({ id: this.selectedRow.nCuenta });
        } else {
          this.selectedRow = event.row;
        }

      } else {
        this.selectedRow = event.row;
      }


    }
  }

}
