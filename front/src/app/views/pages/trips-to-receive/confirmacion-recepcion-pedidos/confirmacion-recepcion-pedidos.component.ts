import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComprasService } from 'src/services/compras.service';
import { UtilsService } from 'src/services/utils.service';
import * as dayjs from 'dayjs';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-confirmacion-recepcion-pedidos',
  templateUrl: './confirmacion-recepcion-pedidos.component.html',
  styleUrls: ['./confirmacion-recepcion-pedidos.component.scss'],
  providers: [DatePipe]
})
export class ConfirmacionRecepcionPedidosComponent implements OnInit {

  data: any[] = [];
  dataTemp: any[] = [];
  loadingIndicator: boolean;
  reorderable: boolean;
  valueBuscador = '';
  selectedRow: any;
  form: FormGroup;
  maxDate = new Date();
  minDate = new Date();
  @Input() public compra: any;
  @Input() public compras: any;
  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private util: UtilsService,
    private service: ComprasService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.dataTemp = [];
    this.data = [];
    this.minDate = new Date(this.compra.dFechaCompraOrigen);
    let disableRecibidos = false;
    console.log(this.minDate);
    console.log(this.maxDate);
    let today = dayjs(new Date().toISOString().split('T')[0]).format('YYYY-MM-DD') //new Date().toISOString().split('T')[0];

    if (this.compras) {
      disableRecibidos = true;
    }
    this.form = this.formBuilder.group({
      nLitrosComprados: [{ value: this.compra.nlitrosComprados, disabled: true }, Validators.required],
      nLitrosRecibidos: [{ value: this.compra.nlitrosComprados, disabled: disableRecibidos }, [Validators.required, Validators.min(0.01)]],
      dFechaRecepcion: [this.datePipe.transform(new Date(), 'yyyy-MM-dd')],
      cObservaciones: [''],
    });
  }

  get nLitrosComprados(): number {
    return this.form.get('nLitrosComprados')?.value ?? 0.0000;
  }

  get nLitrosRecibidos(): number {
    return this.form.get('nLitrosRecibidos')?.value ?? 0.0000;
  }

  get dFechaRecepcion(): any {
    return this.form.get('dFechaRecepcion')?.value;
  }

  get cObservaciones(): string {
    return this.form.get('cObservaciones')?.value ?? '';
  }
  close(vm: any = this) {
    vm.activeModal.close({});
  }
  async guardar() {

    if (this.nLitrosRecibidos > this.nLitrosComprados) {
      this.util.dialogError('La cantidad de litros recibidos no puede ser mayor a los litros comprados.');
    } else {

 

      if (this.compras) {
        this.compras.forEach(async (element: any) => {
          let litrosRecibir = 0;
          let estatus = 3;
          litrosRecibir = element.nLitrosPendientes - element.nLitrosRestantes;

          if (element.nLitrosPendientes !== element.nLitrosRestantes) {
            if (element.nLitrosRestantes > 0) {
              estatus = 5
            }

            await this.service.confirmarCompra({
              nCompra: element.nCompra,
              nLitrosRecepcion: litrosRecibir,
              dFechaRecepcion: new Date(this.dFechaRecepcion).toISOString().split('T')[0],
              cObervaciones: this.cObservaciones,
              nEstatus: estatus
            }).subscribe(async (resp: any) => {
              if (resp) {
                this.util.dialogSuccess('Compra guardada correctamente.');
                this.activeModal.close(this.compras);
              }
            }, (error: any) => {
              this.util.dialogError('Error al confirmar la compra.');
            });
          }

        });
      } else {
        await this.service.confirmarCompra({
          nCompra: this.compra.nCompra,
          nLitrosRecepcion: this.nLitrosRecibidos,
          dFechaRecepcion: new Date(this.dFechaRecepcion).toISOString().split('T')[0],
          cObervaciones: this.cObservaciones,
          nEstatus: 3
        }).subscribe(async (resp: any) => {
          if (resp) {
            this.util.dialogSuccess('Compra guardada correctamente.');
            this.compra.nLitrosRecibidos = this.nLitrosRecibidos;
            this.compra.nEstatus = 3;
            this.compra.cMotivoCancelacion = this.cObservaciones;
            this.activeModal.close(this.compra);
          }
        }, (error: any) => {
          this.util.dialogError('Error al confirmar la compra.');
        });
      }

    }
  }


}
