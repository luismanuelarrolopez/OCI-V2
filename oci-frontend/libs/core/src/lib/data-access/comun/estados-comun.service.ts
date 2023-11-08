import {
  Actividad,
  Causa,
  Hallazgo,
  plan,
  Accion
} from '@unicauca/modules/plan-mejoramiento/data-access';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class EstadosComunService {
  constructor() {}

  private objPlan = new BehaviorSubject<plan>(null);
  private objHallazgo = new BehaviorSubject<Hallazgo>(null);
  private objCausa = new BehaviorSubject<Causa>(null);
  private objAccion = new BehaviorSubject<Accion>(null);
  private objActividad = new BehaviorSubject<Actividad>(null);
  private objSelectedIndex = new BehaviorSubject<number>(0);

  public customPlan = this.objPlan.asObservable();
  public customHallazgo = this.objHallazgo.asObservable();
  public customCausa = this.objCausa.asObservable();
  public customAccion = this.objAccion.asObservable();
  public customActividad = this.objActividad.asObservable();
  public customSelectedIndex = this.objSelectedIndex.asObservable();

  public changePlan(msg): void {
    this.objPlan.next(msg);
  }
  public changeHallazgo(msg): void {
    this.objHallazgo.next(msg);
  }
  public changeCausa(msg): void {
    this.objCausa.next(msg);
  }
  public changeAccion(msg): void {
    this.objAccion.next(msg);
  }
  public changeActividad(msg): void {
    this.objActividad.next(msg);
  }
  public changeSelectedIndex(msg): void {
    this.objSelectedIndex.next(msg);
  }
}
