import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FleterasService {

  private baseUrl: string;
  private urlFleteras = "catalogos/fleteras";

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  obtenerFleteras(nFletera: number): any {
    return this.http.get(this.baseUrl + this.urlFleteras + '/' + nFletera);
  }

  guardarFletera(item: any): any {

    return this.http.post(this.baseUrl + this.urlFleteras, item);
  }

  eliminarFletera(nFletera: number): any {

    return this.http.delete(this.baseUrl + this.urlFleteras + '/' +  nFletera);
  }
}

