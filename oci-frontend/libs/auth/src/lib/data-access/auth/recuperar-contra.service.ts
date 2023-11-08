import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from 'apps/control-interno/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecuperarContraService {
  constructor(private http: HttpClient) {}

  recuperarContrasena(usuario: string): Observable<any> {
    //url de petición
    const base = environment.apiRoot;
    const url = `${base}recoverPassword`;

    //envio del heard o el usuario
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    //parámetros
    const parametros = new URLSearchParams();
    parametros.set('email', usuario);

    //envio de petición
    return this.http.post<any>(url, parametros.toString(), {
      headers: httpHeaders,
    });
  }

  cambiarContra(usuario: number, password: string): Observable<any> {
    //url de petición
    const base = environment.apiRoot;
    const url = `${base}changePassword/${usuario}`;

    //envio del heard o el usuario
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    //parámetros
    const parametros = new URLSearchParams();
    parametros.set('newPassword', password);

    //envio de petición
    return this.http.put<any>(url, parametros.toString(), {
      headers: httpHeaders,
    });
  }
}
