import { EuroSymbolPipe } from './euro-symbol.pipe';

describe('EuroSymbolPipe', () => {
    let pipe: EuroSymbolPipe;

    beforeEach(() => {
        pipe = new EuroSymbolPipe();
    });

    it('should transform "EUR" to "€"', () => {
        const result = pipe.transform('EUR');

        expect(result).toBe('€');
    });

    it('should not transform other strings', () => {
        const result = pipe.transform('USD');

        expect(result).toBe('USD');
    });
});
