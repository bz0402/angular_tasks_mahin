import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 30, trail: string = '...'): string {

    if (!value) return '';

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
