import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  transform(value: string, maxLength: number): string {
    if(maxLength === undefined) {
      return value;
    }

    if(value.length > maxLength) {
      return value.substring(0, maxLength) + '...';
    } else {
      return value;
    }
  }

}
