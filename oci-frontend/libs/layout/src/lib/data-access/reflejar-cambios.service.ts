import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ReflejarCambiosService {
  constructor() {}

  private objCargo = new BehaviorSubject<string>('');

  public customCargo = this.objCargo.asObservable();

  public changeCargo(msg: string): void {
    this.objCargo.next(msg);
  }
}
