/* eslint-disable @typescript-eslint/no-use-before-define */
import { PriceOffersPageData } from '../support/page-data/price-offers';

const pd = new PriceOffersPageData();

describe('Price offers flow', () => {
    beforeEach(() => cy.visit(pd.url));

    it('should paste data and find a flight', () => {
        const departure = 'Amsterdam Airport Schiphol';
        const destination = 'Barcelona-El Prat Airport';
        const departureDate = '10/22/2023';
        const destinationDate = '10/30/2023';

        cy.getTagged(pd.formSubmitBtn).should('be.disabled');

        cy.getTagged(pd.departureFormInput).find('input').type(departure);
        cy.getTagged(pd.destinationFormInput).find('input').type(destination);
        cy.getTagged(pd.departureDateFormInput).find('mat-label').type(departureDate);
        cy.getTagged(pd.destinationDateFormInput).find('mat-label').type(destinationDate);

        cy.getTagged(pd.formSubmitBtn).click();

        cy.getTagged(pd.flightListCard).should('have.length', 4);
    });

    it('should see all flights bu default', () => {
        cy.getTagged(pd.flightListCard).should('have.length', 20);
    });
});
