import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'modules-causas-feature-causas',
        loadChildren: () =>
          import('@unicauca/modules/causas/feature-causas').then(
            (module) => module.ModulesCausasFeatureCausasModule
          ),
      },
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
})
export class ModulesCausasFeatureShellModule {}
