import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import { UserService } from './data-access/comun/user.service';
import { SpinnerService } from './data-access/comun/spinner.service';
import { PositionService } from './data-access/comun/position.service';
import { EstadosComunService } from './data-access/comun/estados-comun.service';
@NgModule({
  imports: [CommonModule, HttpClientModule],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        SpinnerService,
        UserService,
        PositionService,
        EstadosComunService,
      ],
    };
  }
  constructor(@Optional() @SkipSelf() coreModule: CoreModule) {
    if (coreModule) {
      throw new Error(
        'CoreModule ya fue importado, solo se permite que sea importado una única vez en la aplicación'
      );
    }
  }
}
