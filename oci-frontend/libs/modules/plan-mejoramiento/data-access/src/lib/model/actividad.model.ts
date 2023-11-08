import { User } from '@unicauca/core';
import { Person } from '@unicauca/core';
import { Accion } from './accion.model';

export class Actividad {
  periodicidad: string;
  indicador: string;
  public tipo_unidad: string;
  valor_unidad: number;
  recurso: string;
  estado: number;
  fechaEjecucion: Date;
  fechaSeguimiento: Date;
  fechaTerminacion: Date;
  descripcionActividad: string;
  objAccion: Accion;
  //"listaEvidencias": []
  id_Actividad: number;
  objResponsable: User;
  tipoEvidencia: string;
}
