import { Route } from '@angular/router';
import { RoutesEnum } from 'shared-core';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: RoutesEnum.PriceOffers,
        pathMatch: 'full'
    },
    {
        path: '',
        children: [
            {
                title: 'Price Offers page',
                path: RoutesEnum.PriceOffers,
                loadChildren: () => import('price-offers/routes')
            }
        ]
    }
];
