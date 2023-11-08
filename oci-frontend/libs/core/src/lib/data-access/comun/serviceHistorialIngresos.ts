import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/control-interno/src/environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class serviceHistorialIngresos {
  private urlEndPoint: string = environment.apiRoot;

  constructor(private http: HttpClient) {}

  historialIng(): Observable<any> {
    //url de petición
    const url = this.urlEndPoint + 'logins';

    //envio de petición
    return this.http.get<any>(url);
  }
}
