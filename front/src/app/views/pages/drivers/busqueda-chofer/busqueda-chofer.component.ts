import { ClienteService } from '../../../../../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChoferesService } from 'src/services/choferes.service';

@Component({
  selector: 'app-busqueda-chofer',
  templateUrl: './busqueda-chofer.component.html',
  styleUrls: ['./busqueda-chofer.component.scss']
})
export class BusquedaChoferComponent implements OnInit {

  data: any[] = [];
  dataTemp: any[] = [];
  loadingIndicator: boolean;
  reorderable: boolean;
  valueBuscador = '';
  selectedRow: any;
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private service: ChoferesService) { }

  ngOnInit(): void {
    // Obtener los datos

    this.service.obtenerChoferes(0, -1).subscribe( (resp: any) => {
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
          d.nChofer.toString().toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d.cNombre.toLowerCase().indexOf(val) !== -1 || !val ||
          d.cApellidoPaterno.toLowerCase().indexOf(val) !== -1 || !val ||
          d.cApellidoMaterno.toLowerCase().indexOf(val) !== -1 || !val ||
          d.cRFC.toLowerCase().indexOf(val) !== -1 || !val
      );

      this.data = temp;
    }
  }

  onClick(event: any) {
    if (event.type == 'click') {
      if (this.selectedRow) {
        if (this.selectedRow.nChofer == event.row.nChofer) {
          this.activeModal.close({ id: this.selectedRow.nChofer });
        } else {
          this.selectedRow = event.row;
        }

      } else {
        this.selectedRow = event.row;
      }


    }
  }

}
