
export interface estadoPeriodicidadModelo {
  id: number;
  descripcion: string;
}

export const estadosPeriodicidad: estadoPeriodicidadModelo[] = [
  { id: 1, descripcion: 'Permanente' },
  { id: 2, descripcion: 'Semanal' },
  { id: 3, descripcion: 'Quincenal' },
  { id: 4, descripcion: 'Mensual' },
  { id: 5, descripcion: 'Bimensual' },
  { id: 6, descripcion: 'Trimestral' },
  { id: 7, descripcion: 'Cuatrimestral' },
  { id: 8, descripcion: 'Semestral' },
  { id: 9, descripcion: 'Anual' },
  { id: 10, descripcion: 'Bianual' },
  { id: 11, descripcion: 'Eventual' },
];
