import { Subject } from 'rxjs';

export const ErrorService = jest.fn().mockImplementation(() => {
    return {
        error$: new Subject(),
        setError: jest.fn()
    };
});
