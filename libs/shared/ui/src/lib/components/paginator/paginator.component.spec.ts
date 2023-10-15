import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
    let fixture: ComponentFixture<PaginatorComponent>;
    let component: PaginatorComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PaginatorComponent, MatPaginatorModule, BrowserAnimationsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(PaginatorComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should emit PageEvent when page is changed', () => {
        const pageEvent: PageEvent = { pageIndex: 1, pageSize: 10, length: 100 };

        jest.spyOn(component.pageEvent, 'emit');
        component.handlePageEvent(pageEvent);

        expect(component.pageEvent.emit).toHaveBeenCalledWith(pageEvent);
    });

    it('should render the paginator', () => {
        const matPaginator = fixture.nativeElement.querySelector('mat-paginator');

        expect(matPaginator).toBeTruthy();
    });
});
