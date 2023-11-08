import { Pipe, PipeTransform } from '@angular/core';

import { isObservable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

@Pipe({
  name: 'withLoading',
})
export class WithLoadingPipe implements PipeTransform {
  transform(val): any {
    return isObservable(val)
      ? val.pipe(
          map((value) => ({ loading: false, value })),
          startWith({ loading: true }),
          catchError((err) => of({ loading: false, err }))
        )
      : val;
  }
}
