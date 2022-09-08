import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticulosService } from 'src/services/articulos.service';

@Component({
  selector: 'app-busqueda-articles',
  templateUrl: './busqueda-articles.component.html',
  styleUrls: ['./busqueda-articles.component.scss']
})
export class BusquedaArticlesComponent implements OnInit {

  data: any[] = [];
  dataTemp: any[] = [];
  loadingIndicator: boolean;
  reorderable: boolean;
  valueBuscador = '';
  selectedRow: any;
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private service: ArticulosService) { }

  ngOnInit(): void {

    // Obtener los datos
    console.log('entro');
    this.service.obtenerArticulos(0, -1).subscribe( (resp: any) => {
      this.data = resp.data;
      this.dataTemp = [...this.data];
    }, (error: any) => {

    })

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
          d.nArticulo.toString().toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d.cDescripcionCorta.toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d.cDescripcionLarga.toLowerCase().indexOf(val) !== -1 ||
          !val
      );

      this.data = temp;
    }
  }

  onClick(event: any) {
    if (event.type == 'click') {
      if (this.selectedRow) {
        if (this.selectedRow.nArticulo == event.row.nArticulo) {
          this.activeModal.close({ id: this.selectedRow.nArticulo });
        } else {
          this.selectedRow = event.row;
        }

      } else {
        this.selectedRow = event.row;
      }
    }
  }

}
