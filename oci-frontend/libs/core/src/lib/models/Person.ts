import { Position } from './Position';

export class Person {
  id: number;
  names: string;
  surnames: string;
  idPerson: number;
  documentType: string;
  email: string;
  objPosition: Position;

  constructor() {
    this.objPosition = new Position();
  }
}
