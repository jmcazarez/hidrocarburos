import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComprasService } from 'src/services/compras.service';
import { UtilsService } from 'src/services/utils.service';
@Component({
  selector: 'app-confirmacion-recepcion-pedidos',
  templateUrl: './confirmacion-recepcion-pedidos.component.html',
  styleUrls: ['./confirmacion-recepcion-pedidos.component.scss']
})
export class ConfirmacionRecepcionPedidosComponent implements OnInit {

  data: any[] = [];
  dataTemp: any[] = [];
  loadingIndicator: boolean;
  reorderable: boolean;
  valueBuscador = '';
  selectedRow: any;
  form: FormGroup;
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

    console.log();
    this.form = this.formBuilder.group({
      nLitrosComprados: [{ value: this.compra.nlitrosComprados, disabled: true }, Validators.required],
      nLitrosRecibidos: [0.00, [Validators.required, Validators.min(0.01)]],
    });
  }


  get nLitrosComprados(): number {
    return this.form.get('nLitrosComprados')?.value ?? 0.00;
  }

  get nLitrosRecibidos(): number {
    return this.form.get('nLitrosRecibidos')?.value ?? 0.00;
  }
  close(vm: any = this) {
    vm.activeModal.close({});
  }
  async guardar() {
    if (this.nLitrosRecibidos > this.nLitrosComprados) {
      this.util.dialogError('La cantidad de litros recibidos no puede ser mayor a los litros comprados.');
    } else {
        await this.service.confirmarCompra({
          nCompra : this.compra.nCompra,
          nLitrosRecepcion : this.nLitrosRecibidos,
        }).subscribe ( async (resp: any) => {
          if (resp) {
            this.util.dialogSuccess('Compra guardada correctamente.');
            this.compra.nLitrosRecibidos = this.nLitrosRecibidos;
            this.compra.nEstatus = 3;
            this.activeModal.close(this.compra);
          }
        }, (error: any) => {
          this.util.dialogError('Error al confirmar la compra.');
        });
    }
  }


}
