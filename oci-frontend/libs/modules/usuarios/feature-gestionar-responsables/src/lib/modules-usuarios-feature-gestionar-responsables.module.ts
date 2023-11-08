import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedComponentsTablaModule } from '@unicauca/shared/components/tabla';
import { SharedPipesModule } from '@unicauca/shared/pipes';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HistorialComponent } from './historial/historial.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { GestionResponsablesComponent } from './gestion-responsables/gestion-responsables.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModulesUsuariosDataAccessModule } from '@unicauca/modules/usuarios/data-access';

const routes: Routes = [
  {
    path: 'historial',
    component: HistorialComponent,
  },
  {
    path: 'gestionar-responsables',
    component: GestionResponsablesComponent,
  },
  {
    path: 'gestionar-responsables/:id',
    component: GestionResponsablesComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,

    FlexLayoutModule,

    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,

    ModulesUsuariosDataAccessModule.forChild(),

    SharedPipesModule,
    SharedComponentsTablaModule,

    RouterModule.forChild(routes),
  ],
  declarations: [HistorialComponent, GestionResponsablesComponent],
})
export class ModulesUsuariosFeatureGestionarResponsablesModule {}
