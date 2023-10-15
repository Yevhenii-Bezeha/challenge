import { AfterViewInit, Directive } from '@angular/core';

@Directive({
    selector: '[hideSpinner]',
    standalone: true
})
export class HideMainSpinnerDirective implements AfterViewInit {
    ngAfterViewInit(): void {
        const spinnerElement = document.getElementById('spinner');

        if (spinnerElement) {
            spinnerElement.remove();
        }
    }
}
