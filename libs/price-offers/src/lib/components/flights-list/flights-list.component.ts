import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { EuroSymbolPipe } from 'shared-core';

import { IPriceOffers } from '../../models/price-offers';

@Component({
    selector: 'lib-flights-list',
    standalone: true,
    templateUrl: './flights-list.component.html',
    styleUrls: ['./flights-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatCardModule, EuroSymbolPipe, NgForOf]
})
export class FlightsListComponent {
  @Input({ required: true }) flights: IPriceOffers[] = [];
}
