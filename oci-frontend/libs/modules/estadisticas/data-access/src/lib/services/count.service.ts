import { Injectable } from '@angular/core';

@Injectable()
export class CountService {
  constructor() {}

  public countEstado(lista: any[], estados: any[]): any[] {
    let listaRetorno = [];
    let cont = 0;
    estados.forEach((item) => {
      for (let index = 0; index < lista.length; index++) {
        const estado = lista[index].estado;
        if (estado === item.descripcion) {
          lista.splice(index, 1);
          index--;
          cont++;
        }
      }
      listaRetorno.push({ name: item.descripcion, value: cont });
      cont = 0;
    });
    return listaRetorno;
  }

  public countAvance(lista: any[], clasficacionAvance: any[]): any[] {
    let listaRetorno = [];
    let cont = 0;
    clasficacionAvance.forEach((item) => {
      for (let index = 0; index < lista.length; index++) {
        const avance = lista[index].avance;
        if (avance >= item.limInf && avance <= item.limSup) {
          lista.splice(index, 1);
          cont++;
          index--;
        }
      }
      listaRetorno.push({ name: item.rango, value: cont });
      cont = 0;
    });
    return listaRetorno;
  }
}
