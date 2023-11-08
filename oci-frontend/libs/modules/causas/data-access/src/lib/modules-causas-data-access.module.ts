import { CausaService } from './service/causa.service';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
})
export class ModulesCausasDataAccessModule {
  static forChild(): ModuleWithProviders<ModulesCausasDataAccessModule> {
    return {
      ngModule: ModulesCausasDataAccessModule,
      providers: [CausaService],
    };
  }
}
