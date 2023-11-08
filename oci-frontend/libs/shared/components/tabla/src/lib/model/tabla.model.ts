export interface Columna {
  tipo?: TipoColumna;
  ordenar?: boolean;
  nombreCelda: string;
  nombreCeldaHeader: string;
}

export enum TipoColumna {
  FECHA = 1,
  FECHA_SIN_HORA,
  ACCIONES,
  ROL,
  SELECT
}

export interface EstadoButtons {
  crear?: boolean;
  visualizar?: boolean;
  editar?: boolean;
  eliminar?: boolean;
  upload?: boolean;
  seleccionar?: boolean;
  adjuntarEvidencia?: boolean;
  crearObservacion?: boolean;
  verObservacion?: boolean;
}
