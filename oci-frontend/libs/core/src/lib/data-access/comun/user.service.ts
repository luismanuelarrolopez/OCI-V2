import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import swal from 'sweetalert2';
import { User } from '../../models/User';
import { Role } from '../../models/Role';
import { environment } from 'apps/control-interno/src/environments/environment';

@Injectable()
export class UserService {
  private urlEndPoint: string = environment.apiRoot;
  //roles: Role[];
  user: User[];

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router: Router) {}

  getUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(this.urlEndPoint + 'users');
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.urlEndPoint + 'roles');
  }

  getUsuario(id: number): Observable<User> {
    return this.http.get<User>(`${this.urlEndPoint}users/${id}`).pipe(
      catchError((e) => {
        // this.router.navigate(['/users']);
        // console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  create(usuario): Observable<User> {
    return this.http
      .post<User>(this.urlEndPoint + 'saveUser', usuario, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          console.log(e.error.mensaje);
          swal.fire('Error al crear el usuario', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }

  update(usuario, id: number): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}users/${id}`, usuario, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          const separacion = e.error.mensajeDuplicacion.split('\'');
          console.error(e.error.mensaje);
          swal.fire(
            e.error.mensaje,
            'El registro '+separacion[1]+' ya existe en la base de datos',
            'error'
          );
          return throwError(e);
        })
      );
  }

  delete(id: number): Observable<User> {
    return this.http
      .delete<User>(`${this.urlEndPoint}users/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          console.error(e.error.mensaje);
          swal.fire(
            e.error.mensaje,
            'El usuario tiene asociado un plan de mejoramiento',
            'error'
          );
          return throwError(e);
        })
      );
  }

  getUsuariosPorRol(rol: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.urlEndPoint}usersRol?rol=${rol}`);
  }
}
