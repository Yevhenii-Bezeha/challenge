import { TestBed } from '@angular/core/testing';

import { PriceOffersServiceMock } from './price-offers-mock.service';

describe('PriceOffersServiceMock', () => {
    let service: PriceOffersServiceMock;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PriceOffersServiceMock]
        });

        service = TestBed.inject(PriceOffersServiceMock);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
