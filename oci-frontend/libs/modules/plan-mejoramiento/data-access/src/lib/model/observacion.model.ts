import { Person } from '@unicauca/core';
import { plan } from '@unicauca/modules/plan-mejoramiento/data-access';
export class Observacion{
  id_observacion: number;
  objPlan: plan;
  objPerson: Person;
  descripcion: string;
  fecha_registro: Date;
  estado: string;
  tipo_plan_mejora: string;
}
