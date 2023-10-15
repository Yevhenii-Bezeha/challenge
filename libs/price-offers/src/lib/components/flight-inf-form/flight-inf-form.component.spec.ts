import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlightInfFormComponent } from './flight-inf-form.component';

describe('FlightInfFormComponent', () => {
    let component: FlightInfFormComponent;
    let fixture: ComponentFixture<FlightInfFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FlightInfFormComponent, ReactiveFormsModule, BrowserAnimationsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(FlightInfFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
