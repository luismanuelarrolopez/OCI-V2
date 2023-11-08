import { Hallazgo } from './hallazgo.model';
import { User } from '@unicauca/core';
import { Proceso } from './proceso.model';

export class plan {
  idPlanMejoramiento: string;
  objLiderAuditor: User;
  objLiderProceso: User;
  proceso: Proceso;
  listaHallazgos: Hallazgo[];

  nombre: string;
  responsable: string;
  fechaInicio: string;
  fechaFin: string;
  fechaSuscripcion: string;
  estado: string;
  codeURL: string;
  pathSoporte: string;
  prorrogado: boolean;
  mensaje: any;
}


export function cambiarTextoAFecha(cadena: string) {
  const splitVerfificacion = cadena.split('T');
  if (splitVerfificacion.length > 1) {
    cadena = splitVerfificacion[0];
  }
  const date = cadena.split('-');
  const anio = Number(date[0]);
  const mes = Number(date[1]) - 1;
  const dia = Number(date[2]);
  const fecha = new Date();
  fecha.setDate(dia);
  fecha.setMonth(mes);
  fecha.setFullYear(anio);
  fecha.setHours(0);
  fecha.setMinutes(0);
  fecha.setSeconds(0);
  fecha.setMilliseconds(0);
  return fecha;
}
