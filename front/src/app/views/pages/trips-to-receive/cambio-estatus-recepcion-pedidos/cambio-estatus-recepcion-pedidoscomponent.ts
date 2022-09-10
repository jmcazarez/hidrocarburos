import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComprasService } from 'src/services/compras.service';
import { UtilsService } from 'src/services/utils.service';
import * as dayjs from 'dayjs';
@Component({
  selector: 'app-cambio-estatus-recepcion-pedidos',
  templateUrl: './cambio-estatus-recepcion-pedidos.component.html',
  styleUrls: ['./cambio-estatus-recepcion-pedidos.component.scss']
})
export class CambioEstatusRecepcionPedidosComponent implements OnInit {

  data: any[] = [];
  dataTemp: any[] = [];
  loadingIndicator: boolean;
  reorderable: boolean;
  valueBuscador = '';
  selectedRow: any;
  form: FormGroup;
  maxDate = new Date();
  @Input() public compra: any;
  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private util: UtilsService,
    private service: ComprasService,
  ) {
  }

  ngOnInit(): void {
    this.dataTemp = [];
    this.data = [];

    let today = dayjs(new Date().toISOString().split('T')[0]).format('YYYY-MM-DD') //new Date().toISOString().split('T')[0];

    console.log(today);
    this.form = this.formBuilder.group({
      cMotivoCancelacion: [this.compra.cMotivoCancelacion, Validators.required],
    });
  }

  get cMotivoCancelacion(): string {
    return this.form.get('cMotivoCancelacion')?.value ?? '';
  }


  close(vm: any = this) {
    vm.activeModal.close({});
  }
  async guardar() {
    await this.service.actualizarEstatusCompra({
      nCompra: this.compra.nCompra,
      cMotivoCancelacion: this.cMotivoCancelacion,
      nEstatus: this.compra.nEstatus
    }).subscribe(async (resp: any) => {
      if (resp) {
        if (this.compra.nEstatus == 4) {
          this.util.dialogSuccess('Recepción de compra cancelada correctamente.');

        } else {
          this.util.dialogSuccess('Cambio de estatus de recepción de compra  correctamente.');
        }

        this.compra.cMotivoCancelacion = this.cMotivoCancelacion;
        this.activeModal.close(this.compra);

      }
    }, (error: any) => {
      if (this.compra.nEstatus == 4) {
        this.util.dialogError('Error al cancelar la recepción de la compra.');
      } else {
        this.util.dialogError('Error al cambiar el estatus de la recepción de compra.');
      }

    });
  }


}
