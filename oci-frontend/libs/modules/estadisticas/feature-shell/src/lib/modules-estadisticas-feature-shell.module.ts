import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'all',
    loadChildren: () =>
      import('@unicauca/modules/estadisticas/feature-estadisticas').then(
        (module) => module.ModulesEstadisticasFeatureEstadisticasModule
      ),
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ModulesEstadisticasFeatureShellModule {}
