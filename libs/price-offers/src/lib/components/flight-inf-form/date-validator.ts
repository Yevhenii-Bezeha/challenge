import { AbstractControl } from '@angular/forms';

export function dateValidator(control: AbstractControl): null {
    const departureDatesControl = control.get('departureDate');
    const destinationDatesControl = control.get('destinationDate');

    if (departureDatesControl && destinationDatesControl
        && departureDatesControl.value > destinationDatesControl.value) {
        destinationDatesControl.setErrors({ invalidDate: true });
    }

    return null;
}
