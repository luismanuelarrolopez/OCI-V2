export interface escalaAvanceModelo {
  limInf: number;
  limSup: number;
  rango: string;
}

export const escalaAvance: escalaAvanceModelo[] = [
  { limInf: 0, limSup: 29, rango: '< 30% Crítico' },
  { limInf: 30, limSup: 49, rango: '30-49% Inaceptable' },
  { limInf: 50, limSup: 79, rango: '50-79% Aceptable' },
  { limInf: 80, limSup: 100, rango: '≥ 80% Sobresaliente' },
];
