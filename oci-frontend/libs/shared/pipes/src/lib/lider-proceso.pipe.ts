import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'liderProceso'
})
export class LiderProcesoPipe implements PipeTransform {

  transform(value: string): unknown {
    if (value === 'Liderdeproceso') {
      value = 'Líder de proceso'
    }
    return value;
  }

}
