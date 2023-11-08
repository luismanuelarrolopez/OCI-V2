import { environment } from './../../../../../../../apps/control-interno/src/environments/environment';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlanAuditorDTO } from '../model/plan-auditor.dto';


const BASE_ENDPOINT = environment.apiRoot + 'evidencia/getTablaAuditor/'

@Injectable()
export class ListaPlanAuditorService {
  constructor(private httpClient: HttpClient) {}

  findByAuditorEmail(email: string): Observable<PlanAuditorDTO[]> {
    return this.httpClient.get<PlanAuditorDTO[]>(`${BASE_ENDPOINT}${email}`);
  }
}
