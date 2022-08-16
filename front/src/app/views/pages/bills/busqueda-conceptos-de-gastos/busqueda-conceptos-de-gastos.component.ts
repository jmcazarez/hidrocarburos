import { CuentasBancariasService } from '../../../../../services/cuentas_bancarias.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConceptosDeGastosService } from 'src/services/concepto_de_gastos.service';

@Component({
  selector: 'app-busqueda-conceptos-de-gastos',
  templateUrl: './busqueda-conceptos-de-gastos.component.html',
  styleUrls: ['./busqueda-conceptos-de-gastos.component.scss']
})
export class BusquedaConceptosDeGastosComponent implements OnInit {

  data: any[] = [];
  dataTemp: any[] = [];
  loadingIndicator: boolean;
  reorderable: boolean;
  valueBuscador = '';
  selectedRow: any;
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private service: ConceptosDeGastosService) { }

  ngOnInit(): void {
    // Obtener los datos

    this.service.obtenerConceptoDeGastos(0).subscribe( (resp: any) => {
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
          d.nConcepto.toString().toLowerCase().indexOf(val) !== -1 ||
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
        if (this.selectedRow.nConcepto == event.row.nConcepto) {
          this.activeModal.close({ id: this.selectedRow.nConcepto });
        } else {
          this.selectedRow = event.row;
        }

      } else {
        this.selectedRow = event.row;
      }


    }
  }

}
