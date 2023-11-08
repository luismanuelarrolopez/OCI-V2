import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/control-interno/src/environments/environment';
import { Observable } from 'rxjs';
import { Observacion } from '../model/observacion.model';

@Injectable()
export class ObservacionesService {

  private urlEndPoint: string = environment.apiRoot+'observacion/';

  constructor(private http: HttpClient) {}

  public getObservacionPorIdPlan(codeUrl: string): Observable<Observacion[]> {
    const options = {
      headers: {
        'code-url': codeUrl,
        'Content-Type': 'application/json',
      },
    };

    return this.http.get<Observacion[]>(this.urlEndPoint+'getObservacionPorIdPlan', options);
  }
  public crearObservacion(observacion: Observacion): Observable<any>{
    return this.http.post<any>(this.urlEndPoint+'observaciones', observacion);
  }
  public editarObservacion(observacion: Observacion, idObservacion: number):Observable<any>{
    return this.http.put<any>(this.urlEndPoint+`observaciones/${idObservacion}`, observacion);
  }
  public eliminarObservacion(idObservacion: number): Observable<any>{
    return this.http.delete<any>(this.urlEndPoint+`observaciones/${idObservacion}`)
  }
}
