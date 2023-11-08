import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdTypeService } from './serivces/id-type.service';

@NgModule({
  imports: [CommonModule],
})
export class ModulesUsuariosDataAccessModule {
  static forChild(): ModuleWithProviders<ModulesUsuariosDataAccessModule> {
    return {
      ngModule: ModulesUsuariosDataAccessModule,
      providers: [IdTypeService],
    };
  }
}
