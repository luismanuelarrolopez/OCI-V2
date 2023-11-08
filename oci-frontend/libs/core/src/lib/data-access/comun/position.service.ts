import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Position } from '../../models/Position';
import { Dependence } from '../../models/Dependence';
import { environment } from 'apps/control-interno/src/environments/environment';

@Injectable()
export class PositionService {
  private urlEndPoint: string = environment.apiRoot;
  constructor(private http: HttpClient) {}

  getPositions() {
    return this.http.get<Position[]>(this.urlEndPoint + 'positions');
  }

  getDependences() {
    return this.http.get<Dependence[]>(this.urlEndPoint + 'dependences');
  }
}
