import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SucursalService } from 'src/services/sucursal.service';

@Component({
  selector: 'app-busqueda-sucursal',
  templateUrl: './busqueda-sucursal.component.html',
  styleUrls: ['./busqueda-sucursal.component.scss']
})
export class BusquedaSucursalComponent implements OnInit {

  data: any[] = [];
  dataTemp: any[] = [];
  loadingIndicator: boolean;
  reorderable: boolean;
  valueBuscador = '';
  selectedRow: any;
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private service: SucursalService) { }

  ngOnInit(): void {
    // Obtener los datos

    this.service.obtenerSucursales(0).subscribe( (resp: any) => {
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
          d.nSucursal.toString().toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d.cDescripcion.toLowerCase().indexOf(val) !== -1 ||
          !val
      );

      this.data = temp;
    }
  }

  onClick(event: any) {
    if (event.type == 'click') {
      if (this.selectedRow) {
        if (this.selectedRow.nSucursal == event.row.nSucursal) {
          this.activeModal.close({ id: this.selectedRow.nSucursal });
        } else {
          this.selectedRow = event.row;
        }

      } else {
        this.selectedRow = event.row;
      }


    }
  }

}

