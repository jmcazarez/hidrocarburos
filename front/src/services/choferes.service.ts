import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChoferesService {

  private baseUrl: string;
  private urlChoferes = "catalogos/choferes";

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  obtenerChoferes(nChofer: number, nFletera: number): any {
    return this.http.get(this.baseUrl + this.urlChoferes + '/' + nChofer + '/' + nFletera);
  }

  guardarChofer(item: any): any {

    return this.http.post(this.baseUrl + this.urlChoferes, item);
  }

  eliminarChofer(nChofer: number): any {

    return this.http.delete(this.baseUrl + this.urlChoferes + '/' +  nChofer);
  }
}

