import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HistorialActividadesComponent } from './historial-actividades/historial-actividades.component';
import { GestionActividadesComponent } from './gestion-actividades/gestion-actividades.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedComponentsTablaModule } from '@unicauca/shared/components/tabla';
import { ModulesAccionesDataAccessModule } from '@unicauca/modules/acciones/data-access';
import { SharedComponentsTablaLideresModule } from '@unicauca/shared/components/tabla-lideres';
import { ModulesActividadesDataAccessModule } from '@unicauca/modules/actividades/data-access';
import { ModulesPlanMejoramientoDataAccessModule } from '@unicauca/modules/plan-mejoramiento/data-access';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';

import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    SharedComponentsTablaModule,
    SharedComponentsTablaLideresModule,

    ModulesAccionesDataAccessModule.forChild(),
    ModulesActividadesDataAccessModule.forChild(),
    ModulesPlanMejoramientoDataAccessModule.forChild(),

    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatDatepickerModule,

    FlexLayoutModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
  declarations: [HistorialActividadesComponent, GestionActividadesComponent],
  exports: [HistorialActividadesComponent, GestionActividadesComponent],
})
export class ModulesActividadesFeatureActividadesModule {}
