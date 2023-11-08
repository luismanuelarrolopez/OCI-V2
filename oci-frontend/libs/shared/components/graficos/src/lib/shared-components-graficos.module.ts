import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { CirculoGraficoComponent } from './circulo-grafico/circulo-grafico.component';
import { PastelGraficoComponent } from './pastel-grafico/pastel-grafico.component';
import { PorcentajeGraficoComponent } from './porcentaje-grafico/porcentaje-grafico.component';

@NgModule({
  imports: [CommonModule, MatCardModule, NgxChartsModule],
  declarations: [
    CirculoGraficoComponent,
    PastelGraficoComponent,
    PorcentajeGraficoComponent,
  ],
  exports: [
    CirculoGraficoComponent,
    PastelGraficoComponent,
    PorcentajeGraficoComponent,
  ],
})
export class SharedComponentsGraficosModule {}
