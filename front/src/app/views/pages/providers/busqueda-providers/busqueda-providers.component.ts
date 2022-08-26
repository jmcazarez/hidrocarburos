import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProveedorService } from 'src/services/proveedor.service';

@Component({
  selector: 'app-busqueda-providers',
  templateUrl: './busqueda-providers.component.html',
  styleUrls: ['./busqueda-providers.component.scss']
})
export class BusquedaProvidersComponent implements OnInit {

  data: any[] = [];
  dataTemp: any[] = [];
  loadingIndicator: boolean;
  reorderable: boolean;
  valueBuscador = '';
  selectedRow: any;
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private service: ProveedorService) { }

  ngOnInit(): void {
    this.dataTemp = [];
    this.data = [];
    // Obtener los datos
    this.service.obtenerProveedores(0).subscribe((resp: any) => {

      resp.data.forEach((proveedor: {
        cRFC: any; bPersonaFisica: any; cNombre: string; cApellidoPaterno: string; cApellidoMaterno: string; cRazonSocial: string; nProveedor: any;
      }) => {

        let cDescripcion = '';
        if (proveedor.bPersonaFisica) {
          cDescripcion = proveedor.cNombre ?? '' + ' ' + proveedor.cApellidoPaterno ?? '' + ' ' + proveedor.cApellidoMaterno ?? ''

        }
        else {
          cDescripcion = proveedor.cRazonSocial
        }
        this.dataTemp.push({
          nProveedor: proveedor.nProveedor,
          cRFC: proveedor.cRFC,
          cDescripcion: cDescripcion,
          bPersonaFisica: proveedor.bPersonaFisica
        });

      });
      this.data = [...this.dataTemp];
    }, (error: any) => {

    })

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
          d.nProveedor.toString().toLowerCase().indexOf(val) !== -1 ||
          !val ||
          d.cDescripcion.toLowerCase().indexOf(val) !== -1 ||
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
        if (this.selectedRow.nProveedor == event.row.nProveedor) {
          this.activeModal.close({ id: this.selectedRow.nProveedor });
        } else {
          this.selectedRow = event.row;
        }

      } else {
        this.selectedRow = event.row;
      }


    }
  }

}
