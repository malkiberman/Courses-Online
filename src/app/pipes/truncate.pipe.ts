import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {

  
  transform(value: string, limit: number): string {
    if (!value) {
      return '';
    }
    const truncatedValue = value.length > limit ? value.substring(0, limit) + '...' : value;
    console.log('Truncated value:', truncatedValue); // הוסף console.log
    return truncatedValue;
  }


}
