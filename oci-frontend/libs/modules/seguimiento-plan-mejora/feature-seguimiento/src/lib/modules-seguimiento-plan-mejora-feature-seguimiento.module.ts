import { ModulesGestionPlanResponsableDataAccessModule } from './../../../../gestion-plan-responsable/data-access/src/lib/modules-gestion-plan-responsable-data-access.module';
import { MatRadioModule } from '@angular/material/radio';
import { ContainerComponent } from './../../../../../shared/components/tabs/src/lib/container/container.component';
import { SharedComponentsContenedorDashboardModule } from './../../../../../shared/components/contenedor-dashboard/src/lib/shared-components-contenedor-dashboard.module';
import { ModulesSeguimientoPlanMejoraDataAccessModule } from './../../../data-access/src/lib/modules-seguimiento-plan-mejora-data-access.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SeguimientoAuditorComponent } from './seguimiento-auditor/seguimiento-auditor.component';
import { SharedComponentsTablaModule } from '@unicauca/shared/components/tabla';
import { SharedPipesModule } from '@unicauca/shared/pipes';
import { VerActividadesAuditorComponent } from './ver-actividades-auditor/ver-actividades-auditor.component';

import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ComponenteBaseComponent } from './componente-base/componente-base.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ModulesActividadesDataAccessModule } from '@unicauca/modules/actividades/data-access';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EvaluarEvidenciaComponent } from './evaluar-evidencia/evaluar-evidencia.component';
import { ActualizarAvanceComponent } from './actualizar-avance/actualizar-avance.component';

const routes: Routes = [
  {
    path: '',
    component: ComponenteBaseComponent,
    children: [
      {
        path: '',
        component: ContainerComponent,
        children: [
          {
            path: '',
            component: SeguimientoAuditorComponent,
          },
          {
            path: 'actividades/:idPlan/:nombrePlan/:fechaFin',
            component: VerActividadesAuditorComponent,
          },
        ],
      },
    ],
  },
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

    LayoutModule,
    FlexLayoutModule,

    ModulesActividadesDataAccessModule.forChild(),
    ModulesSeguimientoPlanMejoraDataAccessModule.forChild(),
    ModulesGestionPlanResponsableDataAccessModule.forChild(),

    MatListModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSidenavModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,

    SharedPipesModule,
    SharedComponentsTablaModule,
    SharedComponentsContenedorDashboardModule,
  ],
  declarations: [
    SeguimientoAuditorComponent,
    VerActividadesAuditorComponent,
    ComponenteBaseComponent,
    EvaluarEvidenciaComponent,
    ActualizarAvanceComponent,
  ],
})
export class ModulesSeguimientoPlanMejoraFeatureSeguimientoModule {}
