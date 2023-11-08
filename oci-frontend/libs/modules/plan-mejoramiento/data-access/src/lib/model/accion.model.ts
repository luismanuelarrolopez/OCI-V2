import { Causa } from './causa.model';

export class Accion {
  idAccion: number;
  accion: string;
  descripcion: string;
  tipoAccion: string;
  objCausa: Causa;
}
