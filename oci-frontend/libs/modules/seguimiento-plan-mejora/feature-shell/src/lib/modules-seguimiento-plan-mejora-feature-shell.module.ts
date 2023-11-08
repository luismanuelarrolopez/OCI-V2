import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'seguimiento',
        loadChildren: () =>
          import(
            '@unicauca/modules/seguimiento-plan-mejora/feature-seguimiento'
          ).then(
            (module) =>
              module.ModulesSeguimientoPlanMejoraFeatureSeguimientoModule
          ),
      },
    ]),
  ],
})
export class ModulesSeguimientoPlanMejoraFeatureShellModule {}
