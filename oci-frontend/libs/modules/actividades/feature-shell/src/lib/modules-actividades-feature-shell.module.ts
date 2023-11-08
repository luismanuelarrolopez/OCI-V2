import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'historial',
        loadChildren: () =>
          import('@unicauca/modules/actividades/feature-actividades').then(
            (module) => module.ModulesActividadesFeatureActividadesModule
          ),
      },
    ]),
  ],
})
export class ModulesActividadesFeatureShellModule {}
