import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hallazgo } from '@unicauca/modules/plan-mejoramiento/data-access';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from 'apps/control-interno/src/environments/environment';

@Injectable()
export class HallazgoService {
  private urlEndPoint: string = environment.apiRoot;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  public getHallazgos(codeUrl: string): Observable<Hallazgo[]> {
    const options = {
      headers: {
        'code-url': codeUrl,
        'Content-Type': 'application/json',
      },
    };
    return this.http.get<Hallazgo[]>(
      this.urlEndPoint + 'hallazgo/getHallazgosPorIdPlan',
      options
    );
  }
  public getHallazgoPorId(idHallazgo: number): Observable<Hallazgo> {
    return this.http.get<Hallazgo>(
      this.urlEndPoint + `hallazgo/hallazgos/${idHallazgo}`
    );
  }
  public crearHallazgo(hallazgo: Hallazgo): Observable<any> {
    return this.http.post(this.urlEndPoint + 'hallazgo/hallazgos', hallazgo);
  }
  public editarHallazgo(hallazgo: Hallazgo, id: number): Observable<any> {
    return this.http.put<any>(
      this.urlEndPoint + `hallazgo/hallazgos/${id}`,
      hallazgo
    );
  }
  public eliminarHallazgo(id: number): Observable<any> {
    return this.http.delete<any>(this.urlEndPoint + `hallazgo/hallazgos/${id}`);
  }

  /**
   * Obtiene todos los hallazgos de un proceso específico
   * @param idProceso Identificador del Proceso
   */
  public getHallazgosProceso(idProceso: number) {
    return this.http.get<any>(
      this.urlEndPoint + `hallazgo/hallazgos-proceso/${idProceso}`
    );
  }

  /**
   * Devuelve todos los hallazgos existentes.
   * @returns Objeto con todos los hallazgos registrados en BD
   */
  public getTodosHallazgos(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint + 'hallazgo/hallazgos');
  }

  /**
   * Trae todos los hallazgos de planes activos
   * registrados en la BD
   * @return {*}  {Observable<any>}
   * @memberof HallazgoService
   */
  public getHallazgosActivos(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint + 'hallazgo/hallazgos-activos');
  }
}
