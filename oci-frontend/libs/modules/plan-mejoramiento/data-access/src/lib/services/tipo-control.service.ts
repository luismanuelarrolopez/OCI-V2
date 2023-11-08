import { TipoControl } from './../model/tipo-control.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/control-interno/src/environments/environment';

@Injectable()
export class TipoControlService {

  private urlEndPoint: string = environment.apiRoot+'tipoControl/tipo';

  constructor(private http: HttpClient) {}

  public getTipoControl(): Observable<TipoControl[]>{
    return this.http.get<TipoControl[]>(this.urlEndPoint);
  }
}
