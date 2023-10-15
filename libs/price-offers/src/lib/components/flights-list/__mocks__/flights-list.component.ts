import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'lib-flights-list',
    standalone: true,
    template: '',
    styleUrls: ['./flights-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: []
})
export class FlightsListComponent {
}
