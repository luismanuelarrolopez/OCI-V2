import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'historial-ingresos',
    loadChildren: () =>
      import('@unicauca/modules/usuarios/feature-historial-ingresos').then(
        (module) => module.ModulesUsuariosFeatureHistorialIngresosModule
      ),
  },
  {
    path: 'gestion-usuarios',
    loadChildren: () =>
      import('@unicauca/modules/usuarios/feature-gestion-usuarios').then(
        (module) => module.ModulesUsuariosFeatureGestionUsuariosModule
      ),
  },
  {
    path: 'gestion-responsables',
    loadChildren: () =>
      import('@unicauca/modules/usuarios/feature-gestionar-responsables').then(
        (module) => module.ModulesUsuariosFeatureGestionarResponsablesModule
      ),
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ModulesUsuariosFeatureShellModule {}
