import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComprasService } from 'src/services/compras.service';

@Component({
  selector: 'app-busqueda-flete',
  templateUrl: './busqueda-flete.component.html',
  styleUrls: ['./busqueda-flete.component.scss']
})
export class BusquedaFleteComponent implements OnInit {

  data: any[] = [];
  dataTemp: any[] = [];
  loadingIndicator: boolean;
  reorderable: boolean;
  valueBuscador = '';
  selectedRow: any;
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private service: ComprasService) { }

  ngOnInit(): void {
    // Obtener los datos
    console.log('ngOnInit');
    this.service.obtenerFlete(0).subscribe( (resp: any) => {
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
          d.cOrigen.toString().toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d.cDestino.toLowerCase().indexOf(val) !== -1 ||
          !val 
      );

      this.data = temp;
    }
  }

  onClick(event: any) {
    if (event.type == 'click') {
      if (this.selectedRow) {
        if (this.selectedRow.nRuta == event.row.nRuta) {
          this.activeModal.close({ id: this.selectedRow.nRuta });
        } else {
          this.selectedRow = event.row;
        }

      } else {
        this.selectedRow = event.row;
      }


    }
  }

}
