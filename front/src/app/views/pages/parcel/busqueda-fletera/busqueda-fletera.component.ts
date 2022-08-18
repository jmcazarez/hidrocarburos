import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FleterasService } from 'src/services/fleteras.service';

@Component({
  selector: 'app-busqueda-fletera',
  templateUrl: './busqueda-fletera.component.html',
  styleUrls: ['./busqueda-fletera.component.scss']
})
export class BusquedaFleteraComponent implements OnInit {

  data: any[] = [];
  dataTemp: any[] = [];
  loadingIndicator: boolean;
  reorderable: boolean;
  valueBuscador = '';
  selectedRow: any;
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private service: FleterasService) { }

  ngOnInit(): void {
    // Obtener los datos

    this.service.obtenerFleteras(0).subscribe( (resp: any) => {
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
          d.nFletera.toString().toLowerCase().indexOf(val) !== -1 ||
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
        if (this.selectedRow.nFletera == event.row.nFletera) {
          this.activeModal.close({ id: this.selectedRow.nFletera });
        } else {
          this.selectedRow = event.row;
        }

      } else {
        this.selectedRow = event.row;
      }


    }
  }

}
