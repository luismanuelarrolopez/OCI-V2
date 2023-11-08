import { Injectable } from '@angular/core';
import { IDType } from '../model/IDType';

@Injectable()
export class IdTypeService {
  private typeIDs: IDType[] = [
    {
      id: 0,
      name: 'Cédula de ciudadanía',
      type: 'CC',
    },
    {
      id: 1,
      name: 'Cédula de extranjería',
      type: 'CE',
    },
    {
      id: 2,
      name: 'Pasaporte',
      type: 'PA',
    },
    {
      id: 3,
      name: 'Tarjeta de identidad',
      type: 'TI',
    },
  ];

  constructor() {}

  getTypeIDs() {
    return this.typeIDs;
  }
}
