import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:
          'gestion-plan-responsable',
        loadChildren: () =>
          import(
            '@unicauca/modules/gestion-plan-responsable/feature-gestion-plan-responsable'
          ).then(
            (module) =>
              module.ModulesGestionPlanResponsableFeatureGestionPlanResponsableModule
          ),
      },
    ]),
  ],
})
export class ModulesGestionPlanResponsableFeatureShellModule {}
