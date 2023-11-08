import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/control-interno/src/environments/environment';
import { Observable } from 'rxjs';

import { Person } from '../models/Person';
import { User } from '../models/User';

@Injectable()
export class AuthService {
  private _usuario: User;
  private _token: string;

  constructor(private http: HttpClient) {}

  public getUsuario(): User {
    if (this._usuario != null) {
      return this._usuario;
    } else if (
      this._usuario == null &&
      sessionStorage.getItem('usuario') != null
    ) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as User;
      return this._usuario;
    }
    return new User();
  }

  public setUsuario(usu: User) {
    this._usuario = usu;
  }

  public getToken(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  obtenerTokenAcceso(usuario: User): Observable<any> {
    //url de petición
    const base = environment.authRoot;
    const url = `${base}token`;

    //credenciales para el back
    const credenciales = btoa('angularapp' + ':' + '12345');

    //envio del heard o el usuario
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + credenciales,
    });

    //parámetros
    const parametros = new URLSearchParams();
    parametros.set('grant_type', 'password');
    parametros.set('username', usuario.username);
    parametros.set('password', usuario.password);

    //envio de petición
    return this.http.post<any>(url, parametros.toString(), {
      headers: httpHeaders,
    });
  }

  agregarIngreso(username: string): Observable<any> {
    //url de petición
    const base = environment.apiRoot;
    const url = `${base}saveLogin`;

    //envio del heard o el usuario
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    //parámetros
    const parametros = new URLSearchParams();
    parametros.set('username', username);

    //envio de petición
    return this.http.post<any>(url, parametros.toString(), {
      headers: httpHeaders,
    });
  }

  guardarUsuario(accessToken: string): void {
    const payload = this.obtenerDatosToken(accessToken);
    this._usuario = new User();
    this._usuario.objPerson = new Person();
    this._usuario.objPerson.names = payload.nombre;
    this._usuario.objPerson.surnames = payload.apellido;
    this._usuario.objPerson.email = payload.email;
    this._usuario.id = payload.id;
    this._usuario.username = payload.user_name;
    this._usuario.objRole = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    //console.log(this._token)
    const tok = this._token || sessionStorage.getItem('token');
    const payload = this.obtenerDatosToken(tok);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }
}
