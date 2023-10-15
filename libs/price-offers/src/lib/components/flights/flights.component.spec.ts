import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorService } from 'shared-core';

import { PriceOffersServiceMock } from '../../services/price-offers-mock/price-offers-mock.service';

import { FlightsComponent } from './flights.component';

jest.mock('../../services/price-offers-mock/price-offers-mock.service');
jest.mock('../../../../../shared/core/src/lib/services/error/error.service');

describe('FlightsComponent', () => {
    let component: FlightsComponent;
    let fixture: ComponentFixture<FlightsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FlightsComponent],
            providers: [
                { provide: PriceOffersServiceMock, useFactory: PriceOffersServiceMock },
                { provide: ErrorService, useFactory: ErrorService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(FlightsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
