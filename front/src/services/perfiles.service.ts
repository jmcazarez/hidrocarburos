import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "./../environments/environment";
import { PerfilesModel } from "src/models/perfiles.models";

@Injectable({
  providedIn: "root",
})
export class PerfilesService {
  private baseUrl: string;
  private urlPerfiles = "catalogos/perfiles";

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  obtenerPerfiles(nPerfil: number): any {
    return this.http.get(this.baseUrl + this.urlPerfiles + '/' + nPerfil);
  }

  guardarPerfil(cDescripcion: string): any {

    return this.http.post(this.baseUrl + this.urlPerfiles, { cDescripcion: cDescripcion });
  }


}
