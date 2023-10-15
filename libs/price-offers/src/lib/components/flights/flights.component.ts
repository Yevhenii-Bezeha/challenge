import { AsyncPipe, NgIf } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    signal
} from '@angular/core';
import type { OnInit, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { BehaviorSubject, catchError, delay, EMPTY, map, Observable, switchMap, tap } from 'rxjs';
import { ErrorService } from 'shared-core';
import { PaginatorComponent } from 'shared-ui';

import { FilterOptions } from '../../models/filter-options';
import {
    IPriceOffers,
    ISelectedFlightOptionData
} from '../../models/price-offers';
import { CustomSortPipe } from '../../pipes/custom-sort.pipe';
import { PriceOffersServiceMock } from '../../services/price-offers-mock/price-offers-mock.service';
import { FlightsListComponent } from '../flights-list/flights-list.component';

@Component({
    selector: 'lib-flights',
    standalone: true,
    templateUrl: './flights.component.html',
    styleUrls: ['./flights.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FlightsListComponent,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        CustomSortPipe,
        PaginatorComponent,
        MatProgressSpinnerModule,
        NgIf,
        AsyncPipe
    ]
})
export class FlightsComponent implements OnInit {
    isLoading: WritableSignal<boolean> = signal(true);

    currentFilter: WritableSignal<FilterOptions> = signal(
        FilterOptions.DepartureAirport
    );

    pageIndex: number = 0;
    pageSize: number = 10;

    filterOptions: typeof FilterOptions = FilterOptions;

    allFlights$!: Observable<IPriceOffers[]>;

    flightsSelected$: Observable<IPriceOffers[]> =
        this.priceOffersServiceMock.selectedFlightOption$.pipe(
            tap(() => this.isLoading.set(true)),
            switchMap(selectedFlightOptionData =>
                this.getSelectedFlights(selectedFlightOptionData)),
            delay(1000),
            tap(() => this.isLoading.set(false))
        );

    allFlightsCount: WritableSignal<number> = signal(0);

    private allFlightsSubject: BehaviorSubject<null> = new BehaviorSubject<null>(
        null
    );

    constructor(
        private priceOffersServiceMock: PriceOffersServiceMock,
        private errorService: ErrorService
    ) {}

    ngOnInit() {
        this.allFlights$ = this.allFlightsSubject.pipe(
            switchMap(() =>
                this.priceOffersServiceMock.loadAll().pipe(
                    tap(() => this.isLoading.set(true)),
                    tap(allFlights => this.allFlightsCount.set(allFlights.length)),
                    map(flights => {
                        const startIndex = this.pageIndex * this.pageSize;
                        const endIndex = startIndex + this.pageSize;

                        return flights.slice(startIndex, endIndex);
                    }),
                    map(flights => this.getAirportsShortNames(flights)),
                    delay(1000),
                    tap(() => this.isLoading.set(false)),
                    catchError(() => {
                        this.errorService.setError('Failed to load flights. Try again later');

                        return EMPTY;
                    })
                ))
        );
    }

    selectFilter(value: FilterOptions): void {
        this.currentFilter.set(value);
    }

    onPageEvent(event: PageEvent) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;

        this.allFlightsSubject.next(null);

        this.scrollToTop();
    }

    private getSelectedFlights(
        selectedFlightOptionData: ISelectedFlightOptionData
    ): Observable<IPriceOffers[]> {
        return this.priceOffersServiceMock.loadAll().pipe(
            map(flights =>
                this.findCorrectFlights(flights, selectedFlightOptionData)),
            map(flights => this.getAirportsShortNames(flights)),
            catchError(() => {
                this.errorService.setError('Failed to load flights. Try again later');

                return EMPTY;
            })
        );
    }

    private getAirportsShortNames(flights: IPriceOffers[]): IPriceOffers[] {
        return flights.map(flight => {
            return {
                ...flight,
                origin: this.priceOffersServiceMock.getShortName(flight.origin),
                destination: this.priceOffersServiceMock.getShortName(
                    flight.destination
                )
            };
        });
    }

    private findCorrectFlights(
        flights: IPriceOffers[],
        selectedFlightOptionData: ISelectedFlightOptionData
    ) {
        return flights.filter(flight => {
            const departureDate = new Date(flight.departureDate);
            const destinationDate = new Date(flight.returnDate);

            return (
                flight.origin === selectedFlightOptionData.departure &&
        flight.destination === selectedFlightOptionData.destination &&
        departureDate.toDateString() ===
          selectedFlightOptionData.departureDate.toDateString() &&
        destinationDate.toDateString() ===
          selectedFlightOptionData.destinationDate.toDateString()
            );
        });
    }

    private scrollToTop() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
}
