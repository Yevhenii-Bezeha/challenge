import { Routes } from '@angular/router';

import PriceOffersComponent from './components/price-offers/price-offers.component';

export const routes: Routes = [
    {
        path: '',
        component: PriceOffersComponent,
        title: 'Price Offers'
    }
];

export default routes;
