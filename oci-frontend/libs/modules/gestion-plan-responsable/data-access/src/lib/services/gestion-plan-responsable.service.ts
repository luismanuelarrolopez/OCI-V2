import { Evidencia } from './../model/evidencia.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../../../apps/control-interno/src/environments/environment';
import { Injectable } from '@angular/core';
import { TableroResponsable } from '../model/tableroResponsable.model';
import { Soporte } from '../model/soperte.model';

@Injectable()
export class GestionPlanResponsableService {

  private urlEndPoint: string = environment.apiRoot+'evidencia/';

  constructor(private http: HttpClient) {}

  public tableroResponsable(idResponsable: number): Observable<TableroResponsable[]>{
    return this.http.get<TableroResponsable[]>(this.urlEndPoint +`getTablaResponsable/${idResponsable}`);
  }
  public listadoSoportesIdActividad(idActividad: number): Observable<Soporte[]>{
    return this.http.get<Soporte[]>(this.urlEndPoint + `getEvidenciasPorIdActividad/${idActividad}`);
  }
  public guardarEvidencia(evidencia: Evidencia): Observable<Evidencia>{
    return this.http.post<Evidencia>(this.urlEndPoint+'save', evidencia);
  }

  public updateEvidencia(evidencia: Evidencia): Observable<Evidencia>{
    return this.http.put<Evidencia>(this.urlEndPoint+'update', evidencia);
  }
}
