import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaService } from 'src/services/empresa.service';

@Component({
  selector: 'app-busqueda-business',
  templateUrl: './busqueda-business.component.html',
  styleUrls: ['./busqueda-business.component.scss']
})
export class BusquedaBusinessComponent implements OnInit {

  data: any[] = [];
  dataTemp: any[] = [];
  loadingIndicator: boolean;
  reorderable: boolean;
  valueBuscador = '';
  selectedRow: any;
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private serviceEmpresa: EmpresaService) { }

  ngOnInit(): void {
    // this.data.push({ id: '1', nombre: 'heber' });
    // this.data.push({ id: '3', nombre: 'pedro' });
    // this.data.push({ id: '4', nombre: 'jose' });
    // this.data.push({ id: '5', nombre: 'rafa' });

    // Obtener los datos

    this.serviceEmpresa.obtenerEmpresas(0).subscribe( (resp: any) => {
      this.data = resp.data;
      this.dataTemp = [...this.data];
    }, (error: any) => {

    })

  }


  close(vm: any = this) {
    console.log('cerrar');
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
          d.nEmpresa.toString().toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d.cRazonSocial.toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d.cRFC.toLowerCase().indexOf(val) !== -1 ||
          !val
      );

      this.data = temp;
    }
  }

  onClick(event: any) {
    if (event.type == 'click') {
      if (this.selectedRow) {
        if (this.selectedRow.nEmpresa == event.row.nEmpresa) {
          this.activeModal.close({ id: this.selectedRow.nEmpresa });
        } else {
          this.selectedRow = event.row;
        }

      } else {
        this.selectedRow = event.row;
      }


    }
  }

}
