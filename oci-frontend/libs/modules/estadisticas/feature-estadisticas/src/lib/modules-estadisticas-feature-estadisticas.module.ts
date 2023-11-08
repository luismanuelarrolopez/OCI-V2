import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

import { ModulesEstadisticasDataAccessModule } from '@unicauca/modules/estadisticas/data-access';
import { SharedComponentsTablaModule } from '@unicauca/shared/components/tabla';
import { SharedComponentsGraficosModule } from '@unicauca/shared/components/graficos';

import {
  PlanService,
  ProcesoService,
} from '@unicauca/modules/plan-mejoramiento/data-access';
import { HallazgoService } from '@unicauca/modules/hallazgos/data-access';
import { ActividadesService } from '@unicauca/modules/actividades/data-access';
import { AccionesService } from '@unicauca/modules/acciones/data-access';
import { CountService } from '@unicauca/modules/estadisticas/data-access';
import { ExcelService } from 'libs/modules/estadisticas/data-access/src/lib/services/excel.service';

import { ProcesosPmiComponent } from './procesos-pmi/procesos-pmi.component';
import { PlanMejoramientoComponent } from './plan-mejoramiento/plan-mejoramiento.component';
import { ControlPmComponent } from './control-pm/control-pm.component';
import { ProcesoIndividualComponent } from './proceso-individual/proceso-individual.component';
import { SharedPipesModule } from '@unicauca/shared/pipes';
import { ActividadDialogComponent } from './actividad-dialog/actividad-dialog.component';
import { ControlPlanDialogComponent } from './control-plan-dialog/control-plan-dialog.component';

const routes: Routes = [
  {
    path: 'procesos',
    component: ProcesosPmiComponent,
  },
  {
    path: 'proceso/:idProceso',
    component: ProcesoIndividualComponent,
  },
  {
    path: 'plan-mejora/:idPlan',
    component: PlanMejoramientoComponent,
  },
  {
    path: 'control-pm',
    component: ControlPmComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatGridListModule,
    MatMenuModule,
    MatDialogModule,
    MatDividerModule,

    SharedComponentsTablaModule,
    SharedComponentsGraficosModule,
    SharedPipesModule,

    ModulesEstadisticasDataAccessModule,

    RouterModule.forChild(routes),
  ],
  declarations: [
    ProcesosPmiComponent,
    PlanMejoramientoComponent,
    ControlPmComponent,
    ProcesoIndividualComponent,
    ActividadDialogComponent,
    ControlPlanDialogComponent,
  ],
  exports: [
    ProcesosPmiComponent,
    ProcesoIndividualComponent,
    PlanMejoramientoComponent,
    ControlPmComponent,
  ],
  providers: [
    ProcesoService,
    HallazgoService,
    PlanService,
    ActividadesService,
    AccionesService,
    CountService,
    ExcelService,
  ],
})
export class ModulesEstadisticasFeatureEstadisticasModule {}
