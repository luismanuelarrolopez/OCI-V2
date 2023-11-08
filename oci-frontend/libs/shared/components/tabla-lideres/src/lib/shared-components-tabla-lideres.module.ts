import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { TablaLiderComponent } from './tabla-lider/tabla-lider.component';

// Libs
import { SharedPipesModule } from '@unicauca/shared/pipes';

import { LayoutModule } from '@angular/cdk/layout';

// Material
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,

    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatPaginatorModule,

    LayoutModule,
    FlexLayoutModule,
  ],
  declarations: [TablaLiderComponent],
  exports: [TablaLiderComponent],
})
export class SharedComponentsTablaLideresModule {}
