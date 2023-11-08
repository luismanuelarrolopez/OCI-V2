
export interface ResumenPlan{
  id_HALLAZGO: number;
	hallazgo: string;
	causa: ResumenCausa[];
}

export interface ResumenCausa{
  id_CAUSA: number;
	causa: string;
	accion: ResumenAccion[];
}

export interface ResumenAccion{
  id_ACCION: number;
	accion: string;
	descripcion: string;
	nombre_TIPO_CONTROL: string;
	actividad: ResumenActividad[];
}

export interface ResumenActividad{
  id_ACTIVIDAD: number;
	indicador: string;
	valor_UNIDAD: number;
	periodicidad: string;
	recurso: string;
	responsable: string;
}
