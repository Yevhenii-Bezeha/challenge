import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    private errorSubject: Subject<string> = new Subject<string>();
    // eslint-disable-next-line @typescript-eslint/member-ordering
    error$: Observable<string> = this.errorSubject.asObservable();

    setError(message: string): void {
        this.errorSubject.next(message);
    }
}
