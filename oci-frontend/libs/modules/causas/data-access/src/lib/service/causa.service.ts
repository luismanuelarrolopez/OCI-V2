import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Causa } from '@unicauca/modules/plan-mejoramiento/data-access';
import { environment } from 'apps/control-interno/src/environments/environment';

@Injectable()
export class CausaService {
  private urlEndPoint: string = environment.apiRoot+'causa/';

  constructor(private http: HttpClient) {}

  public getCausaPorIdHallazgo(idHallazgo: number): Observable<Causa[]> {
    return this.http.get<Causa[]>(
      this.urlEndPoint + `getCausasPorIdHallazgo/${idHallazgo}`
    );
  }
  public deleteCausa(idCausa: number): Observable<any>{
    return this.http.delete<any>(this.urlEndPoint+`causas/${idCausa}`)
  }
  public crearCausa(causa: Causa): Observable<any>{
    return this.http.post(this.urlEndPoint+'causas', causa);
  }
  public getCausaPorId(idCausa: number): Observable<any>{
    return this.http.get<any>(this.urlEndPoint+`causas/${idCausa}`)
  }
  public editarCausa(causa: Causa, idCausa: number): Observable<any>{
    return this.http.put<any>(this.urlEndPoint+`causas/${idCausa}`, causa)
  }
}
