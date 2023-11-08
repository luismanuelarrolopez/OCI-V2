import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaLocal',
})
export class FechaLocalPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
