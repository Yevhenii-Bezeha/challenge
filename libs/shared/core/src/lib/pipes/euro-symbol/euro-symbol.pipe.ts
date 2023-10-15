import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'euroSymbol',
    standalone: true
})
export class EuroSymbolPipe implements PipeTransform {
    transform(value: string): string {
        if (value === 'EUR') {
            return '€';
        }

        return value;
    }
}
