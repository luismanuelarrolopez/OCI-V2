import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgregarComponent } from './agregar/agregar.component';
import { HistorialComponent } from './historial/historial.component';

import { Routes, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { SharedPipesModule } from '@unicauca/shared/pipes';
import { SharedComponentsTabsModule } from '@unicauca/shared/components/tabs';
import { SharedComponentsTablaModule } from '@unicauca/shared/components/tabla';
import { SharedComponentsTablaLideresModule } from '@unicauca/shared/components/tabla-lideres';
import { SharedComponentsContenedorDashboardModule } from '@unicauca/shared/components/contenedor-dashboard';

import { AuthModule } from '@unicauca/auth';
import { TabPlanMejoraComponent } from './tab-plan-mejora/tab-plan-mejora.component';

import { ModulesCausasFeatureCausasModule } from '@unicauca/modules/causas/feature-causas';
import { ModulesAccionesFeatureAccionesModule } from '@unicauca/modules/acciones/feature-acciones';
import { ModulesHallazgosFeatureHallazgosModule } from '@unicauca/modules/hallazgos/feature-hallazgos';
import { ContainerComponent } from 'libs/shared/components/tabs/src/lib/container/container.component';
import { ModulesPlanMejoramientoDataAccessModule } from '@unicauca/modules/plan-mejoramiento/data-access';
import { ModulesActividadesFeatureActividadesModule } from '@unicauca/modules/actividades/feature-actividades';
import { GestionCausasComponent } from 'libs/modules/causas/feature-causas/src/lib/gestion-causas/gestion-causas.component';
import { HistorialCausasComponent } from 'libs/modules/causas/feature-causas/src/lib/historial-causas/historial-causas.component';
import { GestionAccionesComponent } from 'libs/modules/acciones/feature-acciones/src/lib/gestion-acciones/gestion-acciones.component';
import { GestionHallazgosComponent } from 'libs/modules/hallazgos/feature-hallazgos/src/lib/gestion-hallazgos/gestion-hallazgos.component';
import { HistorialAccionesComponent } from 'libs/modules/acciones/feature-acciones/src/lib/historial-acciones/historial-acciones.component';
import { HistorialHallazgosComponent } from 'libs/modules/hallazgos/feature-hallazgos/src/lib/historial-hallazgos/historial-hallazgos.component';
import { GestionActividadesComponent } from 'libs/modules/actividades/feature-actividades/src/lib/gestion-actividades/gestion-actividades.component';
import { HistorialActividadesComponent } from 'libs/modules/actividades/feature-actividades/src/lib/historial-actividades/historial-actividades.component';
import { VerPlanComponent } from './ver-plan/ver-plan.component';

import {MatTreeModule} from '@angular/material/tree';
import { ObservacionesComponent } from './observaciones/observaciones.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  {
    path: '',
    component: TabPlanMejoraComponent,
    children: [
      {
        path: 'planes',
        component: ContainerComponent,
        children: [
          {
            path: '',
            component: HistorialComponent,
          },
          {
            path: 'agregar',
            component: AgregarComponent,
          },
          {
            path: 'agregar/:id',
            component: AgregarComponent,
          },
          {
            path: 'ver-plan/:id',
            component: VerPlanComponent,
          },
        ],
      },

      {
        path: 'hallazgos',
        component: ContainerComponent,
        children: [
          {
            path: '',
            component: HistorialHallazgosComponent,
          },
          {
            path: 'gestionHallazgos/:idCode',
            component: GestionHallazgosComponent,
          },
          {
            path: 'gestionHallazgos/:idCode/:idHallazgo',
            component: GestionHallazgosComponent,
          },
        ],
      },
      {
        path: 'causas',
        component: ContainerComponent,
        children: [
          {
            path: '',
            component: HistorialCausasComponent,
          },
          {
            path: 'gestionCausa/:idHallazgo',
            component: GestionCausasComponent,
          },
          {
            path: 'gestionCausa/:idHallazgo/:idCausa',
            component: GestionCausasComponent,
          },
        ],
      },
      {
        path: 'acciones',
        component: ContainerComponent,
        children: [
          {
            path: '',
            component: HistorialAccionesComponent,
          },
          {
            path: 'gestionAccion/:idCausa',
            component: GestionAccionesComponent,
          },
          {
            path: 'gestionAccion/:idCausa/:idAccion',
            component: GestionAccionesComponent,
          },
        ],
      },
      {
        path: 'actividades',
        component: ContainerComponent,
        children: [
          {
            path: '',
            component: HistorialActividadesComponent,
          },
          {
            path: 'gestionActividades/:idAccion',
            component: GestionActividadesComponent,
          },
          {
            path: 'gestionActividades/:idAccion/:idActividad/:esAuditor',
            component: GestionActividadesComponent,
          },
        ],
      },
    ],
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    AuthModule,
    SharedPipesModule,
    SharedComponentsTabsModule,
    SharedComponentsTablaModule,
    ModulesCausasFeatureCausasModule,
    SharedComponentsTablaLideresModule,
    ModulesAccionesFeatureAccionesModule,
    ModulesHallazgosFeatureHallazgosModule,
    ModulesPlanMejoramientoDataAccessModule,
    SharedComponentsContenedorDashboardModule,
    ModulesActividadesFeatureActividadesModule,

    MatTabsModule,
    MatListModule,
    MatIconModule,
    MatTreeModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,

    LayoutModule,
    FlexLayoutModule,

    RouterModule.forChild(routes),
  ],
  declarations: [HistorialComponent, AgregarComponent, TabPlanMejoraComponent, VerPlanComponent, ObservacionesComponent],
})
export class ModulesPlanMejoramientoFeaturePlanesMejoraModule {}
