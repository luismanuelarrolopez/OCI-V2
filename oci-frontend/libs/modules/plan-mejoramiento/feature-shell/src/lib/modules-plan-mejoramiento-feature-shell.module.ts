import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ModulesPlanMejoramientoDataAccessModule } from '@unicauca/modules/plan-mejoramiento/data-access';

const routes: Routes = [
  {
    path: 'historial',
    loadChildren: () =>
      import('@unicauca/modules/plan-mejoramiento/feature-planes-mejora').then(
        (module) => module.ModulesPlanMejoramientoFeaturePlanesMejoraModule
      ),
  },
];
@NgModule({
  imports: [
    CommonModule,
    ModulesPlanMejoramientoDataAccessModule.forChild(),
    RouterModule.forChild(routes),
  ],
})
export class ModulesPlanMejoramientoFeatureShellModule {}
