import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-busqueda-modal',
  templateUrl: './busqueda-modal.component.html',
  styleUrls: ['./busqueda-modal.component.scss']
})
export class BusquedaModalComponent implements OnInit {
  usuarios: any[] = [];
  usuariosTemp: any[] = [];
  loadingIndicator: boolean;
  reorderable: boolean;
  valueBuscador = '';
  selectedRow: any;
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.usuarios.push({ id: '1', nombre: 'heber' });
    this.usuarios.push({ id: '3', nombre: 'pedro' });
    this.usuarios.push({ id: '4', nombre: 'jose' });
    this.usuarios.push({ id: '5', nombre: 'rafa' });

    this.usuariosTemp = [...this.usuarios];
  }


  close(vm: any = this) {
    console.log('cerrar');
    vm.activeModal.close({});
  }

  filterDatatable(value: any): void {
    this.usuarios = this.usuarios;
    // Filtramos tabla
    if (value.target.value === "") {
      this.usuarios = this.usuariosTemp;
    } else {
      const val = value.target.value.toLowerCase();
      const temp = this.usuarios.filter(
        (d) =>
          d.id.toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d.nombre.toLowerCase().indexOf(val) !== -1 ||
          !val
      );

      this.usuarios = temp;
    }
  }

  onClick(event: any) {
    if (event.type == 'click') {
      if (this.selectedRow) {
        if (this.selectedRow.id == event.row.id) {
          this.activeModal.close({ idUsuario: this.selectedRow.id });
        } else {
          this.selectedRow = event.row;
        }

      } else {
        this.selectedRow = event.row;
      }


    }
  }



}
