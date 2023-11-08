import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextSlicePipe } from './text-slice.pipe';
import { CapitalizePipe } from './capitalize.pipe';
import { FechaLocalPipe } from './fecha-local.pipe';
import { WithLoadingPipe } from './with-loading.pipe';
import { FiltroFechasPipe } from './filtro-fechas.pipe';
import { LiderProcesoPipe } from './lider-proceso.pipe';
import { ObjectToArrayPipe } from './object-to-array.pipe';

@NgModule({
  declarations: [
    TextSlicePipe,
    CapitalizePipe,
    FechaLocalPipe,
    WithLoadingPipe,
    FiltroFechasPipe,
    LiderProcesoPipe,
    ObjectToArrayPipe
  ],
  imports: [CommonModule],
  exports: [
    TextSlicePipe,
    CapitalizePipe,
    FechaLocalPipe,
    WithLoadingPipe,
    FiltroFechasPipe,
    LiderProcesoPipe,
    ObjectToArrayPipe
  ],
})
export class SharedPipesModule {}
