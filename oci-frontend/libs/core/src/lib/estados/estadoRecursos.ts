export interface estadoRecursoModelo {
  id: number;
  descripcion: string;
}

export const estadosRecursos: estadoRecursoModelo[] = [
  { id: 1, descripcion: 'Físicos' },
  { id: 2, descripcion: 'Humanos' },
  { id: 3, descripcion: 'Financieros' },
  { id: 4, descripcion: 'Tecnológicos' },
  { id: 5, descripcion: 'Físicos-Tecnológicos' },
  { id: 6, descripcion: 'Humanos-Tecnológicos' },
  { id: 7, descripcion: 'Financieros-Tecnológicos' },
  { id: 8, descripcion: 'Físicos-Humanos' },
  { id: 9, descripcion: 'Físicos-Financieros' },
  { id: 10, descripcion: 'Humanos-Financieros' },
];

export interface EstadoCheck {
  id: number;
  value: string;
  descripcion: string;
  checked?: boolean;
}
