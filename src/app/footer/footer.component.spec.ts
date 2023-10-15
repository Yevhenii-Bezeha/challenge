import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FooterComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        const element = fixture.debugElement.query(By.css('.text'));
        const text = element.nativeElement.textContent;

        expect(text).toContain('2023 - Made with 💜 by Yevhenii Bezeha. All Rights Reserved.');
    });
});
