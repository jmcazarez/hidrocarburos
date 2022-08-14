import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlmacenService } from 'src/services/almacen.service';

@Component({
  selector: 'app-busqueda-almacen',
  templateUrl: './busqueda-almacen.component.html',
  styleUrls: ['./busqueda-almacen.component.scss']
})
export class BusquedaAlmacenComponent implements OnInit {

  data: any[] = [];
  dataTemp: any[] = [];
  loadingIndicator: boolean;
  reorderable: boolean;
  valueBuscador = '';
  selectedRow: any;
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private service: AlmacenService) { }

  ngOnInit(): void {
    // Obtener los datos

    this.service.obtenerAlmacenes(0).subscribe( (resp: any) => {
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
          d.nAlmacen.toString().toLowerCase().indexOf(val) !== -1 ||
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
        if (this.selectedRow.nAlmacen == event.row.nAlmacen) {
          this.activeModal.close({ id: this.selectedRow.nAlmacen });
        } else {
          this.selectedRow = event.row;
        }

      } else {
        this.selectedRow = event.row;
      }


    }
  }

}
