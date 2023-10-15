import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightInfFormComponent } from '../flight-inf-form/flight-inf-form.component';
import { FlightsComponent } from '../flights/flights.component';

import PriceOffersComponent from './price-offers.component';

jest.mock('../flights/flights.component');
jest.mock('../flight-inf-form/flight-inf-form.component');

describe('PriceOffersComponent', () => {
    let component: PriceOffersComponent;
    let fixture: ComponentFixture<PriceOffersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                PriceOffersComponent,
                FlightInfFormComponent,
                FlightsComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PriceOffersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
