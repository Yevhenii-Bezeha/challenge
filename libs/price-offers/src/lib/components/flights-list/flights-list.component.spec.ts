import { NgForOf } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { EuroSymbolPipe } from 'shared-core';

import { FlightsListComponent } from './flights-list.component';

describe('FlightsListComponent', () => {
    let component: FlightsListComponent;
    let fixture: ComponentFixture<FlightsListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FlightsListComponent, MatCardModule, EuroSymbolPipe, NgForOf]
        }).compileComponents();

        fixture = TestBed.createComponent(FlightsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
