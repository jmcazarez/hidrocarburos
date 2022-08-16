import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlmacenService } from 'src/services/almacen.service';
import { PlazasService } from 'src/services/plazas.service';
import { SucursalService } from 'src/services/sucursal.service';
import { UtilsService } from 'src/services/utils.service';
import { Patterns } from 'src/utils/patterns';
import { BusquedaClienteComponent } from '../clients/busqueda-cliente/busqueda-cliente.component';
import { BusquedaSucursalComponent } from './busqueda-sucursal/busqueda-sucursal.component';

@Component({
  selector: 'app-branchs',
  templateUrl: './branchs.component.html',
  styleUrls: ['./branchs.component.scss'],
  preserveWhitespaces: true
})
export class BranchsComponent implements OnInit {

  form: FormGroup;
  almacenes = [] as any[];
  plazas = [] as any[];

  constructor(
    private service: SucursalService,
    private util: UtilsService,
    public modalService: NgbModal,
    private patterns: Patterns,
    private serviceAlmacenes: AlmacenService,
    private servicePlazas: PlazasService
  ) {}

  async ngOnInit(): Promise<void> {
    this.form = new FormGroup({
      nSucursal : new FormControl({ value: '', disabled: true }, []),
      cDescripcion : new FormControl('', Validators.required),
      nPlaza : new FormControl('', Validators.required),
      cCodigoPostal : new FormControl('', [Validators.required, Validators.pattern(this.patterns.zipCode)]),
      cPais : new FormControl('', Validators.required),
      cEstado : new FormControl('', Validators.required),
      cMunicipio : new FormControl('', Validators.required),
      cCiudad : new FormControl('', []),
      cColonia : new FormControl('', Validators.required),
      cDireccion : new FormControl('', Validators.required),
      cTelefono : new FormControl('', [Validators.pattern(this.patterns.basicPhone)]),
      cCorreoElectronico : new FormControl('', [Validators.email]),
      cEncargado : new FormControl('', [Validators.required]),
      cCliente : new FormControl('', []),
      nAlmacen : new FormControl('', [Validators.required]),
    });
    await this.obtenerAlmacenes();
    await this.obtenerPlazas();
  }

  obtenerAlmacenes() {
    this.serviceAlmacenes.obtenerAlmacenes(0).subscribe((resp: any) => {
      this.almacenes = resp.data;
      console.log('Almacenes:', this.almacenes);
    });
  }

  obtenerPlazas() {
    this.servicePlazas.obtenerPlazas(0).subscribe((resp: any) => {
      this.plazas = resp.data;
      console.log('Plazas:', this.plazas);
    });
  }

  get nSucursal(): number {
    if (!this.form.get('nSucursal')?.value ||  this.form.get('nSucursal')?.value == ''){
      return 0;
    }
    return this.form.get('nSucursal')?.value;
  }

  get cDescripcion(): string {
    return this.form.get('cDescripcion')?.value ?? '';
  }

  get nPlaza(): number {
    return this.form.get('nPlaza')?.value ?? 0;
  }

  get cCodigoPostal(): string {
    return this.form.get('cCodigoPostal')?.value ?? '';
  }

  get cPais(): string {
    return this.form.get('cPais')?.value ?? '';
  }

  get cEstado(): string {
    return this.form.get('cEstado')?.value ?? '';
  }

  get cMunicipio(): string {
    return this.form.get('cMunicipio')?.value ?? '';
  }

  get cCiudad(): string {
    return this.form.get('cCiudad')?.value ?? '';
  }

  get cColonia(): string {
    return this.form.get('cColonia')?.value ?? '';
  }

  get cDireccion(): string {
    return this.form.get('cDireccion')?.value ?? '';
  }

  get cTelefono(): string {
    return this.form.get('cTelefono')?.value ?? '';
  }

  get cCorreoElectronico(): string {
    return this.form.get('cCorreoElectronico')?.value ?? '';
  }

  get cEncargado(): string {
    return this.form.get('cEncargado')?.value ?? '';
  }

  get cCliente(): string {
    return this.form.get('cCliente')?.value ?? '';
  }

  get nAlmacen(): number {
    return this.form.get('nAlmacen')?.value ?? 0;
  }


  async guardar(): Promise<void> {

    this.util.dialogConfirm('¿Está seguro que desea guardar los datos?').then((result) => {

      if (result.isConfirmed) {

        const obj = {
          nSucursal: this.nSucursal,
          cDescripcion: this.cDescripcion,
          cPlaza : '',
          cCodigoPostal : this.cCodigoPostal,
          cPais : this.cPais,
          cEstado : this.cEstado,
          cMunicipio : this.cMunicipio,
          cCiudad : '',
          cColonia : this.cColonia,
          cDireccion : this.cDireccion,
          cTelefono : this.cTelefono,
          cCorreoElectronico : this.cCorreoElectronico,
          cEncargado : this.cEncargado,
          cCliente : this.cCliente,
          nAlmacen: this.nAlmacen,
          nPlaza: this.nPlaza
        };

        this.service.guardarSucursal(obj).subscribe(async (resp: any) => {

          if (resp.error !== '') {

            this.util.dialogError(resp.error.error.type);
          }
          else {
            this.limpiar();
            this.util.dialogSuccess('Sucursal guardada correctamente.');
          }
        }, (err: { error: any; }) => {

          this.util.dialogError('Error al guardar la sucursal.');

        });
      }
    });

  }

  openModal() {
    const modalRef = this.modalService.open(BusquedaSucursalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'dialog-formulario-chico',
    });

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if(value){
          this.form.controls["nSucursal"].setValue(value.id);

          this.mostrarDatos();

        }
      }
    );
  }

  mostrarDatos() {
    this.service.obtenerSucursales(this.nSucursal).subscribe ( (resp: any) => {
      if (resp) {
        const sucursal = resp.data[0];
        this.form.controls["nSucursal"].setValue(sucursal.nSucursal);
        this.form.controls["cDescripcion"].setValue(sucursal.cDescripcion);
        this.form.controls["nPlaza"].setValue(sucursal.nPlaza);
        this.form.controls["cCodigoPostal"].setValue(sucursal.cCodigoPostal);
        this.form.controls["cPais"].setValue(sucursal.cPais);
        this.form.controls["cEstado"].setValue(sucursal.cEstado);
        this.form.controls["cMunicipio"].setValue(sucursal.cMunicipio);
        this.form.controls["cCiudad"].setValue(sucursal.cCiudad);
        this.form.controls["cColonia"].setValue(sucursal.cColonia);
        this.form.controls["cDireccion"].setValue(sucursal.cDireccion);
        this.form.controls["cTelefono"].setValue(sucursal.cTelefono);
        this.form.controls["cCorreoElectronico"].setValue(sucursal.cCorreoElectronico);
        this.form.controls["cEncargado"].setValue(sucursal.cEncargado);
        this.form.controls["cCliente"].setValue(sucursal.cCliente);
        this.form.controls["nAlmacen"].setValue(sucursal.nAlmacen);
      }
    }, (error: any) => {

    });
  }

  limpiar() {
    this.form.controls["nSucursal"].setValue('');
    this.form.controls["cDescripcion"].setValue('');
    this.form.controls["nPlaza"].setValue('');
    this.form.controls["cCodigoPostal"].setValue('');
    this.form.controls["cPais"].setValue('');
    this.form.controls["cEstado"].setValue('');
    this.form.controls["cMunicipio"].setValue('');
    this.form.controls["cCiudad"].setValue('');
    this.form.controls["cColonia"].setValue('');
    this.form.controls["cDireccion"].setValue('');
    this.form.controls["cTelefono"].setValue('');
    this.form.controls["cCorreoElectronico"].setValue('');
    this.form.controls["cEncargado"].setValue('');
    this.form.controls["cCliente"].setValue('');
    this.form.controls["nAlmacen"].setValue('');

  }

  eliminar() {
    this.util.dialogConfirm('¿Está seguro que desea eliminar los datos?').then((result) => {
      if (result.isConfirmed) {
        this.service.eliminarSucursal(this.nSucursal).subscribe(async (resp: any) => {
          this.util.dialogSuccess('Sucursal eliminada correctamente.');
          this.limpiar();
        }, (err: { error: any; }) => {
          // if(err.error.error.type){
          //   this.util.dialogError(err.error.error.type);
          // }else{
          //   this.util.dialogError('Error al guardar la empresa.');
          // }
          this.util.dialogError('Error al eliminar la sucursal.');

        });
      }
    });
  }
}
