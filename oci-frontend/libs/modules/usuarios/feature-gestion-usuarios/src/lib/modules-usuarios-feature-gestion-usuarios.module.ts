// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { FlexLayoutModule } from '@angular/flex-layout';

//Compoents
import { GestionComponent } from './gestion/gestion.component';
import { HistorialComponent } from './historial/historial.component';

// Libs
import { SharedPipesModule } from '@unicauca/shared/pipes';
import { SharedComponentsTablaModule } from '@unicauca/shared/components/tabla';
import { ModulesUsuariosDataAccessModule } from '@unicauca/modules/usuarios/data-access';

const routes: Routes = [
  {
    path: 'historial',
    component: HistorialComponent,
  },
  {
    path: 'gestion/:id',
    component: GestionComponent,
  },
  {
    path: 'gestion',
    component: GestionComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    FlexLayoutModule,

    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,

    SharedPipesModule,
    SharedComponentsTablaModule,
    ModulesUsuariosDataAccessModule.forChild(),

    RouterModule.forChild(routes),
  ],
  declarations: [HistorialComponent, GestionComponent],
})
export class ModulesUsuariosFeatureGestionUsuariosModule {}
