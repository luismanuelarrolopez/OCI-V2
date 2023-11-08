import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionPlanResponsableService } from './services/gestion-plan-responsable.service';

@NgModule({
  imports: [CommonModule],
})
export class ModulesGestionPlanResponsableDataAccessModule {
  static forChild(): ModuleWithProviders<ModulesGestionPlanResponsableDataAccessModule> {
    return {
      ngModule: ModulesGestionPlanResponsableDataAccessModule,
      providers: [GestionPlanResponsableService],
    };
  }
}
