import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanService } from './services/plan.service';
import { ProcesoService } from './services/proceso.service';
import { TipoControl } from './model/tipo-control.model';
import { TipoControlService } from './services/tipo-control.service';
import { ObservacionesService } from './services/observaciones.service';

@NgModule({
  imports: [CommonModule],
})
export class ModulesPlanMejoramientoDataAccessModule {
  static forChild(): ModuleWithProviders<ModulesPlanMejoramientoDataAccessModule> {
    return {
      ngModule: ModulesPlanMejoramientoDataAccessModule,
      providers: [PlanService, ProcesoService, ObservacionesService, TipoControlService, TipoControl],
    };
  }
}
