import { Component, OnInit } from '@angular/core';
import { BusquedaModalComponent } from './busqueda-modal/busqueda-modal.component';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/services/utils.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  preserveWhitespaces: true
})
export class UsersComponent implements OnInit {
  constructor(public modalService: NgbModal,
    public utils: UtilsService,) { }
  usuarioForm: FormGroup;
  ngOnInit(): void {
    this.usuarioForm = new FormGroup({
      idUsuario: new FormControl('', Validators.required),
      cNombre: new FormControl('', Validators.required)
    });
   }

  openModal() {
    const modalRef = this.modalService.open(BusquedaModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'dialog-formulario',
    });

    modalRef.closed.subscribe(
      value => {
        if(value){
          this.usuarioForm.controls["idUsuario"].setValue(value.idUsuario);
        }
        this.enfocarBotonNuevaVenta()
      }
    );
  }

  enfocarBotonNuevaVenta(vm: any = this) {
    vm.utils.enfocar("id-usuario");
  }
}
