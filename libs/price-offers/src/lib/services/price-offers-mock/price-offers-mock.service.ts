import { Injectable } from '@angular/core';
import { map, Observable, of, Subject } from 'rxjs';
import { GenericResponseModel, HttpStatusCode } from 'shared-core';

import { fullNameMapping } from '../../models/full-name';
import {
    IPriceOffers,
    ISelectedFlightOptionData
} from '../../models/price-offers';

import * as priceOffersData from './data.json';

@Injectable({
    providedIn: 'root'
})
export class PriceOffersServiceMock {
    private selectedFlightOptionSubject: Subject<ISelectedFlightOptionData> =
        new Subject<ISelectedFlightOptionData>();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    readonly selectedFlightOption$: Observable<ISelectedFlightOptionData> =
        this.selectedFlightOptionSubject.asObservable();

    setSelectedFlightOption(selectedFlightOption: ISelectedFlightOptionData): void {
        this.selectedFlightOptionSubject.next(selectedFlightOption);
    }

    loadAll(): Observable<IPriceOffers[]> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
        const priceOffers = priceOffersData.default;

        return of<GenericResponseModel<IPriceOffers[]>>({
            status: HttpStatusCode.Ok,
            data: priceOffers
        }).pipe(
            map(flights =>
                flights.data.map(flight => {
                    return {
                        ...flight,
                        origin: this.getFullName(flight.origin),
                        destination: this.getFullName(flight.destination)
                    };
                }))
        );
    }

    getShortName(fullName: string): string {
        const shortName = Object.keys(fullNameMapping).find(
            key => fullNameMapping[key] === fullName
        );

        return shortName ?? fullName;
    }

    private getFullName(shortName: string): string {
        return fullNameMapping[shortName] || 'Unknown Origin';
    }
}
