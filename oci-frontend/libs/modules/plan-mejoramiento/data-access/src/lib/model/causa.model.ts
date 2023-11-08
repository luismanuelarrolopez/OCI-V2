import { Hallazgo } from './hallazgo.model';

export class Causa {
  id_causa: number;
  causa: string;
  tipo_control: string;
  objHallazgo: Hallazgo;
}
