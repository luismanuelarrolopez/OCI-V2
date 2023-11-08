import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from 'apps/control-interno/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ProcesoService {
  private urlEndPoint: string = environment.apiRoot;

  constructor(private http: HttpClient) {}

  getProcesos(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint + 'mpdm/procesos');
  }
}
