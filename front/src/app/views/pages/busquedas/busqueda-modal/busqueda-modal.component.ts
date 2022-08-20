import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-busqueda-modal',
  templateUrl: './busqueda-modal.component.html',
  styleUrls: ['./busqueda-modal.component.scss']
})
export class BusquedaModalComponent implements OnInit {

  @Input() public titulo: string;
  @Input() public data: any[] = [];
  @Input() public dataTemp: any[] = [];
  @Input() public props: any[] = [];
  
  loadingIndicator: boolean;
  reorderable: boolean;
  valueBuscador = '';
  selectedRow: any;
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked():void{
    window.dispatchEvent(new Event('resize'));
  }


  close(vm: any = this) {
    vm.activeModal.close({});
  }

  filterDatatable(value: any): void {
    this.data = this.dataTemp;
    // Filtramos tabla
    if (value.target.value === "") {
      this.data = this.dataTemp;
    } else {
      const val = value.target.value.toLowerCase();
      const temp = this.data.filter(
        (d) =>
          d[Object.keys(d)[0]].toString().toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d[Object.keys(d)[1]].toLowerCase().indexOf(val) !== -1 ||
          !val
      );

      this.data = temp;
    }
  }

  onClick(event: any) {
    if (event.type == 'click') {
      if (this.selectedRow) {

        const rowSel = this.selectedRow[Object.keys(this.selectedRow)[0]];
        const eventSel =  event.row[Object.keys(event.row)[0]];

        if (rowSel == eventSel) {
          this.activeModal.close({ id: this.selectedRow[Object.keys(this.selectedRow)[0]], cDescripcion: this.selectedRow[Object.keys(this.selectedRow)[1]] });
        } else {
          this.selectedRow = event.row;
        }

      } else {
        this.selectedRow = event.row;
      }

    }
  }

}
