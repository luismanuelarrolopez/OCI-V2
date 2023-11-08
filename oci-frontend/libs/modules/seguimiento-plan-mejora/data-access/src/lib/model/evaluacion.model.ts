import { Person } from '@unicauca/core';
import { Evidencia } from './../../../../../gestion-plan-responsable/data-access/src/lib/model/evidencia.model';
export interface Evaluacion{
  id: number;
  observacion: string;
  fecha_evaluacion?: Date;
  estado: string;
	objEvidencia?: Evidencia;
  objPersona?: Person;
}
