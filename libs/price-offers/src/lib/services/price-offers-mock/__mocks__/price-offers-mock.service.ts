import { EMPTY, Subject } from 'rxjs';

export const PriceOffersServiceMock = jest.fn().mockImplementation(() => {
    return {
        setSelectedFlightOption: jest.fn(),
        selectedFlightOption$: new Subject(),
        loadAll: jest.fn().mockReturnValue(EMPTY),
        getShortName: jest.fn().mockReturnValue('')
    };
});
