import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'historial-hallazgos',
    loadChildren: () =>
      import('@unicauca/modules/hallazgos/feature-hallazgos').then(
        (module) => module.ModulesHallazgosFeatureHallazgosModule
      ),
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ModulesHallazgosFeatureShellModule {}
