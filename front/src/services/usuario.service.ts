import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "./../environments/environment";
import { UsuarioModel } from "src/models/usuario.models";

@Injectable({
    providedIn: "root",
})
export class UsuarioService {
    private baseUrl: string;
    private urlLogin = "login/";

    constructor(private http: HttpClient) {
        this.baseUrl = environment.api;
    }

    validarUsuario({ usuario }: { usuario: UsuarioModel; }): any {
        return this.http.post(this.baseUrl + this.urlLogin, usuario);
    }


}
