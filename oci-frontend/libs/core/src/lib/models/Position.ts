import { Dependence } from './Dependence';

export class Position {
  id: number;
  positioName: string;
  objDependence: Dependence;

  constructor() {
    this.objDependence = new Dependence();
  }
}
