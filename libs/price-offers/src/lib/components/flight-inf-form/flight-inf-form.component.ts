import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    inject
} from '@angular/core';
import type { OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    FormControl,
    FormGroup,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
    combineLatest,
    debounceTime,
    map,
    Observable,
    startWith,
    switchMap,
    tap
} from 'rxjs';

import { ISelectedFlightOptionData } from '../../models/price-offers';
import { PriceOffersServiceMock } from '../../services/price-offers-mock/price-offers-mock.service';

import { dateValidator } from './date-validator';

interface IFlightInfForm {
  departure: FormControl<string>;
  destination: FormControl<string>;
  departureDate: FormControl<Date | null>;
  destinationDate: FormControl<Date | null>;
}

type AutocompleteAirportListType = 'departure' | 'destination';

@Component({
    selector: 'lib-flight-inf-form',
    standalone: true,
    templateUrl: './flight-inf-form.component.html',
    styleUrls: ['./flight-inf-form.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatAutocompleteModule,
        MatIconModule,
        NgForOf,
        AsyncPipe,
        NgIf,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule
    ]
})
export class FlightInfFormComponent implements OnInit {
    form!: FormGroup<IFlightInfForm>;
    submitDisabled$!: Observable<boolean>;

    departures$!: Observable<string[]>;
    destinations$!: Observable<string[]>;

    filterDepartureDates: (date: Date | null) => boolean =
        this.isDepartureDateAvailable.bind(this);

    filterDestinationDates: (date: Date | null) => boolean =
        this.isDestinationDateAvailable.bind(this);

    private filteredDepartureDates: Date[] = [];
    private filteredDestinationDates: Date[] = [];

    private destroyRef: DestroyRef = inject(DestroyRef);
    private priceOffersServiceMock: PriceOffersServiceMock = inject(
        PriceOffersServiceMock
    );

    private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);

    ngOnInit() {
        this.initForm();

        this.submitDisabled$ = this.isSubmitDisabled();

        this.updateControlsDatesValidity();

        this.departures$ = this.createAutocompleteAirportList('departure');

        this.destinations$ = this.createAutocompleteAirportList('destination');

        this.createAvailableDatesList('departure');

        this.createAvailableDatesList('destination');

        this.handleDepartureDateChange();
    }

    clearDeparture(): void {
        this.form.controls.departure.patchValue('');
    }

    clearDestination(): void {
        this.form.controls.destination.patchValue('');
    }

    onSubmit(): void {
        this.priceOffersServiceMock.setSelectedFlightOption(this.form.value as ISelectedFlightOptionData);
    }

    private createAvailableDatesList(type: AutocompleteAirportListType): void {
        this.form.controls[type].valueChanges
            .pipe(
                tap(() => this.updateControlsDatesValidity()),
                switchMap(() =>
                    this.priceOffersServiceMock.loadAll().pipe(debounceTime(500))),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(result => {
                const filteredFlights = result.filter(
                    flight =>
                        flight.origin === this.form.controls.departure.value &&
                        flight.destination === this.form.controls.destination.value
                );

                this.filteredDepartureDates = filteredFlights.map(
                    flight => new Date(flight.departureDate)
                );

                this.filteredDestinationDates = filteredFlights.map(
                    flight => new Date(flight.returnDate)
                );
            });
    }

    private createAutocompleteAirportList(
        type: AutocompleteAirportListType
    ): Observable<string[]> {
        const localApiDepartureType = type === 'departure' ? 'origin' : 'destination';

        return combineLatest([
            this.form.controls[type].valueChanges,
            this.priceOffersServiceMock.loadAll().pipe(
                debounceTime(500),
                map(airports => airports.map(airport => airport[localApiDepartureType]))
            )
        ]).pipe(
            map(([inputValue, airports]) =>
                this.filterAirports(
                    inputValue ?? '',
                    airports ?? [],
                    this.form.controls[type].value
                )),
            map(airports => airports.filter(airport => airport !== this.form.controls[type].value))
        );
    }

    private isDepartureDateAvailable(date: Date | null): boolean {
        return this.filteredDepartureDates.some(
            availableDate => availableDate.toDateString() === date?.toDateString()
        );
    }

    private isDestinationDateAvailable(date: Date | null): boolean {
        return this.filteredDestinationDates.some(
            availableDate => availableDate.toDateString() === date?.toDateString()
        );
    }

    private filterAirports(
        value: string,
        options: string[],
        otherInputValue: string
    ): string[] {
        const filterValue = value.toLowerCase();

        const filteredOptions = options.filter(
            option =>
                option.toLowerCase().includes(filterValue) &&
        option !== otherInputValue
        );

        return [...new Set(filteredOptions)];
    }

    private updateControlsDatesValidity() {
        const departureControl = this.form.controls.departure;
        const destinationControl = this.form.controls.destination;
        const departureDateControl = this.form.controls.departureDate;
        const destinationDateControl = this.form.controls.destinationDate;

        if (departureControl.valid && destinationControl.valid) {
            departureDateControl.enable();
            destinationDateControl.enable();
        } else {
            departureDateControl.disable();
            departureDateControl.setValue(null);

            destinationDateControl.disable();
            destinationDateControl.setValue(null);
        }
    }

    private initForm(): void {
        this.form = this.fb.group(
            {
                departure: this.fb.control('', Validators.required),
                destination: this.fb.control('', Validators.required),
                departureDate: this.fb.control<Date | null>(
                    { value: null, disabled: true },
                    Validators.required
                ),
                destinationDate: this.fb.control<Date | null>(
                    { value: null, disabled: true },
                    Validators.required
                )
            },
            { validators: dateValidator }
        );
    }

    private isSubmitDisabled(): Observable<boolean> {
        return this.form.statusChanges.pipe(
            startWith(this.form.status),
            map(status => status !== 'VALID')
        );
    }

    private handleDepartureDateChange(): void {
        this.form.controls.departureDate.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            this.form.controls.destinationDate.patchValue(null);
        });
    }
}
