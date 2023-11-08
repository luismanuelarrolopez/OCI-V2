import { FlexLayoutModule } from '@angular/flex-layout';
/*----------------Importaciones---------------- */

// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { TablaComponent } from './tabla/tabla.component';

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
import { MatPaginatorModule } from '@angular/material/paginator';
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
    MatPaginatorModule,

    LayoutModule,
    FlexLayoutModule,

    SharedPipesModule,
  ],
  exports: [TablaComponent],
  declarations: [TablaComponent],
})
export class SharedComponentsTablaModule {}
