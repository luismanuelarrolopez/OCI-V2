import { Actividad } from './../../../../../plan-mejoramiento/data-access/src/lib/model/actividad.model';

export interface Evidencia {
  id: number;
  evidencia: string;
  linkEvidencia: string;
  objActividad: Actividad;
}
