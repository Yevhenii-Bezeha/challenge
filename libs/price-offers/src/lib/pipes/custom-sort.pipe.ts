import { Pipe, PipeTransform } from '@angular/core';

import { FilterOptions } from '../models/filter-options';
import { IPriceOffers } from '../models/price-offers';

@Pipe({
    name: 'customSort',
    standalone: true
})
export class CustomSortPipe implements PipeTransform {
    transform(items: IPriceOffers[], sortBy: FilterOptions): IPriceOffers[] {
        if (!items || !sortBy) {
            return items;
        }

        switch (sortBy) {
            case 'Price':
                return items.slice().sort((a, b) => a.price.amount - b.price.amount);

            case 'Departure Airport':
                return items.slice().sort((a, b) => a.origin.localeCompare(b.origin));

            case 'Destination Airport':
                return items.slice().sort((a, b) => a.destination.localeCompare(b.destination));

            default:
                return items;
        }
    }
}
