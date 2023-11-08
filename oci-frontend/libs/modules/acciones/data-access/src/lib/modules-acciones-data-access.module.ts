import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccionesService } from './service/acciones.service';

@NgModule({
  imports: [CommonModule],
})
export class ModulesAccionesDataAccessModule {
  static forChild(): ModuleWithProviders<ModulesAccionesDataAccessModule> {
    return {
      ngModule: ModulesAccionesDataAccessModule,
      providers: [AccionesService],
    };
  }
}
