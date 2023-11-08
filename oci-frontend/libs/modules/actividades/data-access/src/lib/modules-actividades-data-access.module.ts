import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActividadesService } from './service/actividades.service';

@NgModule({
  imports: [CommonModule],
})
export class ModulesActividadesDataAccessModule {
  static forChild(): ModuleWithProviders<ModulesActividadesDataAccessModule> {
    return {
      ngModule: ModulesActividadesDataAccessModule,
      providers: [ActividadesService],
    };
  }
}
