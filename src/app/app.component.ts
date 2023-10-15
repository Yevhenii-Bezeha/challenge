import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import type { OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ErrorService, HideMainSpinnerDirective, StyleLoaderService } from 'shared-core';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@Component({
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterModule, HeaderComponent, FooterComponent, HideMainSpinnerDirective, MatSnackBarModule]
})
export class AppComponent implements OnInit {
    private destroyRef: DestroyRef = inject(DestroyRef);
    private errorService: ErrorService = inject(ErrorService);
    private snackBar: MatSnackBar = inject(MatSnackBar);
    private styleLoaderService: StyleLoaderService = inject(StyleLoaderService);
    private title: Title = inject(Title);

    ngOnInit() {
        this.title.setTitle('Challenge');
        this.styleLoaderService.load('styles.css');
        this.styleLoaderService.load('deeppurple-amber.css');

        this.errorService.error$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(message => {
            this.snackBar.open(message, 'Close', {
                duration: 5000,
                announcementMessage: message,
                horizontalPosition: 'end',
                verticalPosition: 'top'
            });
        });
    }
}
