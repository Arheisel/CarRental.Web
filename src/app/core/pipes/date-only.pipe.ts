import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateOnly'
})
export class DateOnlyPipe implements PipeTransform {

  transform(value?: string, ...args: unknown[]): string {
    if (!value) return '';

    const date = new Date(value);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }

}
