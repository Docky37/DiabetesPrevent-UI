/*
 *ngFor="let c of oneDimArray | sortBy:'asc'"
 *ngFor="let c of arrayOfObjects | sortBy:'asc':'propertyName'"
*/
import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({ name: 'sortBy' })
export class SortByPipe implements PipeTransform {

    transform(value: any[], order: string = '', column: string = ''): any[] {
        if (!value || order === '' || !order) { return value; } // no array
        if (value.length <= 1) { return value; } // array with only one item
        if (!column || column === '') {
            if (order === 'asc') {
                 return value.sort();
            } else {
                return value.sort().reverse();
            }
        } // sort 1d array
        return orderBy(value, [column], true);
    }
}
