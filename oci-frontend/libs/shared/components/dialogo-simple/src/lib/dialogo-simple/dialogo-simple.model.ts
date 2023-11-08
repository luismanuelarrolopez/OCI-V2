export interface DialogoSimpleModel {
  opcionAceptar?: string;
  opcionCancelar?: string;
  titulo?: string;
  contenido?: string;
  color?: ColorDialogoEnum;
  tipo?: TipoDialogoEnum;
}

export enum ColorDialogoEnum {
  primary = 'primary',
  accent = 'accent',
  warn = 'warn',
}

export enum TipoDialogoEnum {
  advertencia = 'advertencia',
  info = 'info',
  error = 'error',
}
