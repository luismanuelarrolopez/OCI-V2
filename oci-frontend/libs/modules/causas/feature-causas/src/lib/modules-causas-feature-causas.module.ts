import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedComponentsTablaModule } from '@unicauca/shared/components/tabla';
import { GestionCausasComponent } from './gestion-causas/gestion-causas.component';
import { ModulesCausasDataAccessModule } from '@unicauca/modules/causas/data-access';
import { HistorialCausasComponent } from './historial-causas/historial-causas.component';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

import { ModulesHallazgosDataAccessModule } from '@unicauca/modules/hallazgos/data-access';
import { ModulesPlanMejoramientoDataAccessModule } from '@unicauca/modules/plan-mejoramiento/data-access';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [
  { path: 'historial', component: HistorialCausasComponent },
  { path: 'gestion', component: GestionCausasComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    FlexLayoutModule,

    SharedComponentsTablaModule,
    ModulesCausasDataAccessModule.forChild(),
    ModulesPlanMejoramientoDataAccessModule.forChild(),
    ModulesHallazgosDataAccessModule.forChild(),

    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,


    RouterModule.forChild(routes),
  ],
  declarations: [HistorialCausasComponent, GestionCausasComponent],
  exports: [HistorialCausasComponent, GestionCausasComponent],
})
export class ModulesCausasFeatureCausasModule {}
