import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountService } from './services/count.service';
import { ExcelService } from './services/excel.service';

@NgModule({
  imports: [CommonModule],
})
export class ModulesEstadisticasDataAccessModule {
  static forChild(): ModuleWithProviders<ModulesEstadisticasDataAccessModule> {
    return {
      ngModule: ModulesEstadisticasDataAccessModule,
      providers: [CountService, ExcelService],
    };
  }
}
