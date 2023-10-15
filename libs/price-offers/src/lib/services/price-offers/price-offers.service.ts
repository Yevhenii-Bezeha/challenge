import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { GenericResponseModel } from 'shared-core';

import { fullNameMapping } from '../../models/full-name';
import { IPriceOffers, ISelectedFlightOptionData } from '../../models/price-offers';

@Injectable({
    providedIn: 'root'
})
export class PriceOffersService {
    private selectedFlightOptionSubject: Subject<ISelectedFlightOptionData> =
        new Subject<ISelectedFlightOptionData>();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    readonly selectedFlightOption$: Observable<ISelectedFlightOptionData> =
        this.selectedFlightOptionSubject.asObservable();

    private baseUrl: string = '/';

    constructor(private httpClient: HttpClient) {}

    setSelectedFlightOption(selectedFlightOption: ISelectedFlightOptionData): void {
        this.selectedFlightOptionSubject.next(selectedFlightOption);
    }

    loadAll(): Observable<IPriceOffers[]> {
        return this.httpClient.get<GenericResponseModel<IPriceOffers[]>>(this.baseUrl).pipe(
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
