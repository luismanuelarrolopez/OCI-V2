import { ModulesHallazgosDataAccessModule } from './../../../data-access/src/lib/modules-hallazgos-data-access.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HistorialHallazgosComponent } from './historial-hallazgos/historial-hallazgos.component';

import { SharedComponentsTablaModule } from '@unicauca/shared/components/tabla';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GestionHallazgosComponent } from './gestion-hallazgos/gestion-hallazgos.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ModulesPlanMejoramientoDataAccessModule } from '@unicauca/modules/plan-mejoramiento/data-access';

const routes: Routes = [
  { path: 'historial', component: HistorialHallazgosComponent },
  { path: 'gestionHallazgos/:idCode', component: GestionHallazgosComponent },
  {
    path: 'gestionHallazgos/:idCode/:idHallazgo',
    component: GestionHallazgosComponent,
  },
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,

    SharedComponentsTablaModule,
    ModulesPlanMejoramientoDataAccessModule,
    ModulesHallazgosDataAccessModule.forChild(),

    MatCardModule,
    MatInputModule,
    MatButtonModule,

    LayoutModule,
    FlexLayoutModule,

    RouterModule.forChild(routes),
  ],
  declarations: [HistorialHallazgosComponent, GestionHallazgosComponent],
  exports: [HistorialHallazgosComponent, GestionHallazgosComponent],
})
export class ModulesHallazgosFeatureHallazgosModule {}
