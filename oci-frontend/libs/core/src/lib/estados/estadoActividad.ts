export interface estadoActividadModelo {
  id: number;
  descripcion: string;
}

export const estadosActividad: estadoActividadModelo[] = [
  { id: 1, descripcion: 'Incumplida' },
  { id: 2, descripcion: 'Terminada' },
  { id: 3, descripcion: 'Activa' },
  { id: 4, descripcion: 'Por vencerse' },
];
