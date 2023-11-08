import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, FlexLayoutModule, LayoutModule],
  exports: [DashboardComponent],
})
export class SharedComponentsContenedorDashboardModule {}
