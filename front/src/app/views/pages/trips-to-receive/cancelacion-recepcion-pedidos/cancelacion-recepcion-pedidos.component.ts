import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComprasService } from 'src/services/compras.service';
import { UtilsService } from 'src/services/utils.service';
import * as dayjs from 'dayjs';
@Component({
  selector: 'app-cancelacion-recepcion-pedidos',
  templateUrl: './cancelacion-recepcion-pedidos.component.html',
  styleUrls: ['./cancelacion-recepcion-pedidos.component.scss']
})
export class CancelacionRecepcionPedidosComponent implements OnInit {

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
      nCompra : this.compra.nCompra,
      cMotivoCancelacion : this.cMotivoCancelacion,
      nEstatus: 4
    }).subscribe ( async (resp: any) => {
      if (resp) {
        this.util.dialogSuccess('Recepción de compra cancelada correctamente.');
        this.compra.nEstatus = 4;
        this.activeModal.close(this.compra);
      }
    }, (error: any) => {
      this.util.dialogError('Error al cancelar la recepción de la compra.');
    });
  }


}
