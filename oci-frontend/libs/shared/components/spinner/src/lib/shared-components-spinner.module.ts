import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule,
  ],
  declarations: [SpinnerComponent],
  exports: [SpinnerComponent]
})
export class SharedComponentsSpinnerModule {}
