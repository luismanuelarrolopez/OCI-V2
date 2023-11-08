import { HallazgoService } from './service/hallazgo.service';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
})
export class ModulesHallazgosDataAccessModule {
  static forChild(): ModuleWithProviders<ModulesHallazgosDataAccessModule> {
    return {
      ngModule: ModulesHallazgosDataAccessModule,
      providers: [HallazgoService],
    };
  }
}
