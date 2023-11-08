import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'textSlice' })
export class TextSlicePipe implements PipeTransform {
  transform(value: string, limit: number): string {
    let result = value;
    if (value) {
      if (value.length > limit) {
        result = value.slice(0, limit) + ' ...';
      }
    }
    return result;
  }
}
