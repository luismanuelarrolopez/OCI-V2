import { Observable } from 'rxjs';
import { Evaluacion } from './../model/evaluacion.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/control-interno/src/environments/environment';

@Injectable()
export class EvaluacionService {

  private urlEndPoint: string = environment.apiRoot+'evaluacion/';

  constructor(private http: HttpClient) {}

  public guardarEvaluacion(evaluacion: Evaluacion): Observable<Evaluacion>{
    return this.http.post<Evaluacion>(this.urlEndPoint+'save', evaluacion);
  }

  public getEvaluacionId(idEvaluacion: number): Observable<Evaluacion>{
    return this.http.get<Evaluacion>(this.urlEndPoint+`getEvaluacion/${idEvaluacion}`)
  }

  public editarEvaluacion(evaluacion: Evaluacion): Observable<any>{
    return this.http.put<any>(this.urlEndPoint+'update', evaluacion);
  }
}
