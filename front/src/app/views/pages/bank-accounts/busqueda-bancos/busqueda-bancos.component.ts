import { BancosService } from '../../../../../services/bancos.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-busqueda-bancos',
  templateUrl: './busqueda-bancos.component.html',
  styleUrls: ['./busqueda-bancos.component.scss']
})
export class BusquedaBancosComponent implements OnInit {

  data: any[] = [];
  dataTemp: any[] = [];
  loadingIndicator: boolean;
  reorderable: boolean;
  valueBuscador = '';
  selectedRow: any;
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private servicebancos: BancosService) { }

  ngOnInit(): void {
    // Obtener los datos

    this.servicebancos.obtenerBancos(0).subscribe( (resp: any) => {
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
          d.nBanco.toString().toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d.cRazonSocial.toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d.cNombreCorto.toLowerCase().indexOf(val) !== -1 ||
          !val
      );

      this.data = temp;
    }
  }

  onClick(event: any) {
    if (event.type == 'click') {
      if (this.selectedRow) {
        if (this.selectedRow.nBanco == event.row.nBanco) {
          this.activeModal.close({ id: this.selectedRow.nBanco });
        } else {
          this.selectedRow = event.row;
        }

      } else {
        this.selectedRow = event.row;
      }


    }
  }

}
