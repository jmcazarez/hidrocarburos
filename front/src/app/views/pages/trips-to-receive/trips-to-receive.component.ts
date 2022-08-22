import { Component, OnInit } from '@angular/core';
import { ComprasService } from 'src/services/compras.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-trips-to-receive',
  templateUrl: './trips-to-receive.component.html',
  styleUrls: ['./trips-to-receive.component.scss'],
  preserveWhitespaces: true,
  providers: [DatePipe]
})
export class TripsToReceiveComponent implements OnInit {
  valueBuscador = '';
  reorderable = false;
  loadingIndicator = false;
  data: any[] = [];
  dataTemp: any[] = [];
  constructor(private service: ComprasService, private datePipe: DatePipe) { }

  async ngOnInit(): Promise<void> {
    await this.obtenerCatalogosFletera();
  }

  filterDatatable(filtro: any) { }

  obtenerCatalogosFletera() {
    const comprasTemp: any[] = [];
    this.service.obtenerCompras(0).subscribe((resp: any) => {

      console.log(this.dataTemp);
      for (const compra of resp.data) {
        let nCostoxLitro = 0;
        if (compra.nLitrosCompra > 0 && compra.nCostoTotal > 0) {
          nCostoxLitro = compra.nCostoTotal   /  compra.nLitrosCompra
        }

        comprasTemp.push({
          nCompra: compra.nCompra,
          cTipoCompraLarga: compra.cTipoCompraLarga,
          cEmpresa: compra.cEmpresa,
          cAlmacen: compra.cAlmacen,
          cProveedor: compra.cProveedor,
          cFactura: compra.cFactura,
          nlitrosComprados: compra.nLitrosCompra,
          nCostoxLitro: nCostoxLitro,
          dFechaCompra: compra.dFechaCompra,
          nCostoTotal: compra.nCostoTotal,
          nLitrosRecibidos: 0,
          nEstatus: compra.nEstatus,
        })


      }

      this.data = [...comprasTemp];
      this.dataTemp = [...comprasTemp];
      console.log(this.data);
      /*  this.datePipe.transform(vigencia, 'dd-MM-yyyy'), */
    });
  }
}