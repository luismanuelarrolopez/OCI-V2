import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedComponentsTablaModule } from '@unicauca/shared/components/tabla';
import { HistorialAccionesComponent } from './historial-acciones/historial-acciones.component';
import { GestionAccionesComponent } from './gestion-acciones/gestion-acciones.component';
import { ModulesAccionesDataAccessModule } from '@unicauca/modules/acciones/data-access';
import { ModulesPlanMejoramientoDataAccessModule } from '@unicauca/modules/plan-mejoramiento/data-access';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    SharedComponentsTablaModule,

    ModulesAccionesDataAccessModule.forChild(),
    ModulesPlanMejoramientoDataAccessModule.forChild(),

    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,

    FlexLayoutModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
  declarations: [HistorialAccionesComponent, GestionAccionesComponent],
  exports: [HistorialAccionesComponent, GestionAccionesComponent],
})
export class ModulesAccionesFeatureAccionesModule {}
