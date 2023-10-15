import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ErrorService } from './error.service';

describe('ErrorService', () => {
    let service: ErrorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ErrorService);
    });

    it('should set and emit error message', fakeAsync(() => {
        const errorMessage = 'Sample error message';
        let emittedMessage: string | undefined;

        service.error$.subscribe(message => {
            emittedMessage = message;
        });

        service.setError(errorMessage);

        tick();

        expect(emittedMessage).toStrictEqual(errorMessage);
    }));
});
