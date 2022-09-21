import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventariosService {

  private baseUrl: string;
  private urlTiposDeMovimientos = "catalogos/inv_tipo_de_movimientos";

  private urlMovimientosAlmacen = "registros/movimientos_almacen";

  private urlAplicarMovimientosAlmacen = "registros/movimientos_almacen/aplicarMovimiento";
  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  obtenerTiposDeMovimientos(nTipoMovimiento: number): any {
    return this.http.get(this.baseUrl + this.urlTiposDeMovimientos + '/' + nTipoMovimiento );
  }

  obtenerMovimientoDeAlmacen(nMovimientoAlmacen: number): any {
    return this.http.get(this.baseUrl + this.urlMovimientosAlmacen + '/' + nMovimientoAlmacen );
  }

  guardarMovimientoAlmacen(movimiento: any): any {

    return this.http.post(this.baseUrl + this.urlMovimientosAlmacen, movimiento);
  }
  aplicarMovimientoAlmacen(movimiento: any): any {

    return this.http.post(this.baseUrl + this.urlAplicarMovimientosAlmacen, movimiento);
  }
}
