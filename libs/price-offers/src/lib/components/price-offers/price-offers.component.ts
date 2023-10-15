import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FlightInfFormComponent } from '../flight-inf-form/flight-inf-form.component';
import { FlightsComponent } from '../flights/flights.component';

@Component({
    selector: 'lib-price-offers',
    standalone: true,
    templateUrl: './price-offers.component.html',
    styleUrls: ['./price-offers.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FlightInfFormComponent,
        FlightsComponent
    ]
})
export default class PriceOffersComponent {
}
