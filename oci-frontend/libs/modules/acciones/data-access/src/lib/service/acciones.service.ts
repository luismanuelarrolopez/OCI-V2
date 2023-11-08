import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Accion } from '@unicauca/modules/plan-mejoramiento/data-access';
import { environment } from 'apps/control-interno/src/environments/environment';

@Injectable()
export class AccionesService {
  private urlEndPoint: string = environment.apiRoot + 'accion/';

  constructor(private http: HttpClient) {}

  public getAccionPorIdCausa(idCausa: number): Observable<any> {
    return this.http.get<any>(
      this.urlEndPoint + `getAccionesPorIdCausa/${idCausa}`
    );
  }
  public getAccionPorId(idAccion: number): Observable<any> {
    return this.http.get(this.urlEndPoint + `acciones/${idAccion}`);
  }
  public deleteAccion(idAccion: number): Observable<any> {
    return this.http.delete(this.urlEndPoint + `acciones/${idAccion}`);
  }
  public crearAccion(accion: Accion): Observable<any> {
    return this.http.post<any>(this.urlEndPoint + 'acciones', accion);
  }
  public editarAccion(accion: Accion, idAccion: number): Observable<any> {
    return this.http.put<any>(
      this.urlEndPoint + `acciones/${idAccion}`,
      accion
    );
  }
  public countAccionesPorProceso(idProceso: number): Observable<any> {
    return this.http.get<any>(
      this.urlEndPoint + `count-acciones-proceso/${idProceso}`
    );
  }
  public countAccionesPorPlan(idPlan: string): Observable<any> {
    const options = {
      headers: {
        'code-url': idPlan,
        'Content-Type': 'application/json',
      },
    };
    return this.http.get<any>(
      `${this.urlEndPoint}count-acciones-plan`,
      options
    );
  }
  public getAcciones(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint + 'acciones');
  }

  public countAccionesActivas(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint + `count-acciones-activas`);
  }
}
