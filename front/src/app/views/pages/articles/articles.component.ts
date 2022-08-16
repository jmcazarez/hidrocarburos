import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticulosService } from 'src/services/articulos.service';
import { UtilsService } from 'src/services/utils.service';
import Swal from 'sweetalert2';
import { BusquedaArticlesComponent } from './busqueda-articles/busqueda-articles.component';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  preserveWhitespaces: true
})
export class ArticlesComponent implements OnInit {
  form: FormGroup;
  constructor(private service: ArticulosService,
    private util: UtilsService,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      nArticulo: [{ value: '', disabled: true }],
      cDescripcionLarga: new FormControl('', Validators.required),
      cDescripcionCorta: new FormControl('', Validators.required),
      bActivo: new FormControl(1),
    });
  }

  get f() {
    return this.form.controls;
  }

  get nArticulo(): number {
    if (!this.form.get('nArticulo')?.value || this.form.get('nArticulo')?.value == '') {
      return 0;
    }
    return this.form.get('nArticulo')?.value;
  }
  get cDescripcionLarga(): string {
    return this.form.get('cDescripcionLarga')?.value ?? '';
  }
  get cDescripcionCorta(): string {
    return this.form.get('cDescripcionCorta')?.value ?? '';
  }

  async guardar(): Promise<void> {
    const objArticulo = {
      nArticulo: this.nArticulo,
      cDescripcionLarga: this.cDescripcionLarga,
      cDescripcionCorta: this.cDescripcionCorta,
      bPersonaFisica: 1,

    };

    await this.service.guardarArticulo(objArticulo).subscribe(async (resp: any) => {

      if (resp.error !== '') {

        Swal.fire('Error', resp.error.error, 'error');
      }
      else {
        this.limpiar();
        this.util.dialogSuccess('Artículo guardado correctamente.');
      }
    }, (err: { error: any; }) => {
      this.util.dialogError('Error al guardar el Artículo.');

    });
  }

  limpiar() {
    this.form.reset();
  }


  openArticulos() {
    console.log('click');
    const modalRef = this.modalService.open(BusquedaArticlesComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'dialog-formulario',
    });

    modalRef.closed.subscribe(
      value => {
        if (value) {
          this.form.controls["nArticulo"].setValue(value.id);
          if (value.id != 0) {
            this.mostrarDatosArticulo()
          }
        }
        // this.enfocarBotonNuevaVenta()

      }
    );
  }

  mostrarDatosArticulo() {
    this.service.obtenerArticulos(this.nArticulo).subscribe((resp: any) => {
      if (resp) {
        const articulo = resp.data[0];
        this.form.controls["cDescripcionLarga"].setValue(articulo.cDescripcionLarga);
        this.form.controls["cDescripcionCorta"].setValue(articulo.cDescripcionCorta);
      }
    }, (error: any) => {

    });
  }

  cancelar() {
    this.util.dialogConfirm('¿Está seguro que desea eliminar el artículo?').then((result) => {
      if (result.isConfirmed) {
        this.service.cancelarArticulo(this.nArticulo).subscribe(async (resp: any) => {
          this.util.dialogSuccess('Artículo cancelado correctamente.');
          this.limpiar();
        }, (err: { error: any; }) => {
          this.util.dialogError('Error al eliminar el artículo.');
        });
      }
    });
  }

}
