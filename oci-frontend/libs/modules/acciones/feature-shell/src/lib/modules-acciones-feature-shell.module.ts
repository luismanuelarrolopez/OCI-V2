import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'acciones',
        loadChildren: () =>
          import('@unicauca/modules/acciones/feature-acciones').then(
            (module) => module.ModulesAccionesFeatureAccionesModule
          ),
      },
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
})
export class ModulesAccionesFeatureShellModule {}
