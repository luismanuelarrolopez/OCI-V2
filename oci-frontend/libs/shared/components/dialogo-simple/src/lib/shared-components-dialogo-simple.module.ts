import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogoSimpleComponent } from './dialogo-simple/dialogo-simple.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogoSimpleService } from './dialogo-simple/dialogo-simple.service';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [DialogoSimpleComponent],
  exports: [DialogoSimpleComponent],
  providers: [DialogoSimpleService],
})
export class SharedComponentsDialogoSimpleModule {
  static forRoot(): ModuleWithProviders<SharedComponentsDialogoSimpleModule> {
    return {
      ngModule: SharedComponentsDialogoSimpleModule,
      providers: [DialogoSimpleService],
    };
  }
}
