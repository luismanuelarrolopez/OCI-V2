import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Actividad } from '@unicauca/modules/plan-mejoramiento/data-access';
import { environment } from 'apps/control-interno/src/environments/environment';

@Injectable()
export class ActividadesService {
  private urlEndPoint: string = environment.apiRoot + 'actividad/';

  constructor(private http: HttpClient) {}

  public getActividadesPorIdAccion(idAccion: number): Observable<any> {
    return this.http.get<any>(
      this.urlEndPoint + `getActividadesPorIdAccion/${idAccion}`
    );
  }
  public getActividadesPorIdAccionPorIdResponsable(idAccion: number, idResponsable: number): Observable<any> {
    return this.http.get<any>(
      this.urlEndPoint + `getActividadesPorIdAccion/${idAccion}/${idResponsable}`
    );
  }
  public deleteActividad(idActividad: number): Observable<any> {
    return this.http.delete<any>(
      this.urlEndPoint + `actividades/${idActividad}`
    );
  }
  public crearActividad(actividad: Actividad): Observable<any> {
    return this.http.post<any>(this.urlEndPoint + 'actividades', actividad);
  }
  public getActividadPorId(idActividad: number): Observable<Actividad> {
    return this.http.get<Actividad>(
      this.urlEndPoint + `actividades/${idActividad}`
    );
  }
  public editarActividad(
    actividad: Actividad,
    idActividad: number
  ): Observable<any> {
    return this.http.put(
      this.urlEndPoint + `actividades/${idActividad}`,
      actividad
    );
  }
  public getActividadesPorIdPlan(idPlan: string): Observable<any> {
    const options = {
      headers: {
        'code-url': idPlan,
        'Content-Type': 'application/json',
      },
    };
    return this.http.get<any>(
      `${this.urlEndPoint}getActividadesPorIdPlan`,
      options
    );
  }

  public getActividades(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint + 'actividad');
  }

  public getActividadesPorProceso(idProceso: number): Observable<any> {
    return this.http.get<any>(
      this.urlEndPoint + `actividades-proceso/${idProceso}`
    );
  }

  public getActividadesPorPlan(idPlan: string): Observable<any> {
    const options = {
      headers: {
        'code-url': idPlan,
        'Content-Type': 'application/json',
      },
    };
    return this.http.get<any>(`${this.urlEndPoint}actividades-plan`, options);
  }

  public countEstadoActividades(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}count-estado`);
  }

  public countEstadoActividadesProceso(idProceso: number): Observable<any> {
    return this.http.get<any>(
      `${this.urlEndPoint}count-estado-proceso/${idProceso}`
    );
  }

  public countEstadoActividadesPlan(idPlan: string): Observable<any> {
    const options = {
      headers: {
        'id-plan': idPlan,
        'Content-Type': 'application/json',
      },
    };
    return this.http.get<any>(`${this.urlEndPoint}count-estado-plan`, options);
  }

  public getActividadesActivas(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint + 'get-actividades-activas');
  }

  public updateAvanceActividad(data: any): Observable<any> {
    const options = {
      headers: {
        'code-url': data.idPlan,
      },
    };
    return this.http.put<any>(
      `${this.urlEndPoint}update-avance/${data.idActividad}?avance=${data.avance}&idPlan=${data.idPlan}`,
      options
    );
  }
}
