/*------------------Importaciones------------------*/
// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

// libs
import { SharedPipesModule } from '@unicauca/shared/pipes';
import { SharedComponentsTablaModule } from '@unicauca/shared/components/tabla';

// Material
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';

// Components
import { IngresosUsuariosComponent } from './ingresos-usuarios/ingresos-usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: IngresosUsuariosComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    FlexLayoutModule,

    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,

    SharedPipesModule,
    SharedComponentsTablaModule,
    RouterModule.forChild(routes),
  ],
  declarations: [IngresosUsuariosComponent],
})
export class ModulesUsuariosFeatureHistorialIngresosModule {}
