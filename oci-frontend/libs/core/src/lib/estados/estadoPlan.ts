export interface estadoPlanModelo {
  id: number;
  descripcion: string;
}

export const estadosPlan: estadoPlanModelo[] = [
  { id: 1, descripcion: 'Formulación' },
  { id: 2, descripcion: 'Revisión' },
  { id: 3, descripcion: 'Suscripción' },
  { id: 4, descripcion: 'Ejecución' },
  { id: 5, descripcion: 'Finalizado' },
];
