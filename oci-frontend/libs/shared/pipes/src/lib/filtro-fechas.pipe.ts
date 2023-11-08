import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroFechas',
})
export class FiltroFechasPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
