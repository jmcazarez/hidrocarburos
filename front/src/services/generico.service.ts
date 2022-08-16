import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericoService {

  private baseUrl: string;
  private urlGenerico = "catalogos/generico/catalogos-cfdi";

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  obtenerCatalogosCFDI(): any {
    return this.http.get(this.baseUrl + this.urlGenerico);
  }

}

