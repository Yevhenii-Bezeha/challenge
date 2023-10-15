import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorService } from 'shared-core';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

jest.mock('./header/header.component');
jest.mock('./footer/footer.component');
jest.mock('../../libs/shared/core/src/lib/services/error/error.service');

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    const matSnackBarMock = {
        open: jest.fn()
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent, RouterTestingModule, HeaderComponent, MatSnackBarModule, FooterComponent],
            providers: [
                { provide: MatSnackBar, useValue: matSnackBarMock },
                { provide: ErrorService, useFactory: ErrorService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should render', () => {
        expect(component).toBeTruthy();
    });
});
