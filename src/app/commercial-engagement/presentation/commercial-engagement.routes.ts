import { Routes } from '@angular/router';
import { applicationTitle } from '../../shared/presentation/application-title';

const commercialOverview = () =>
  import('./views/commercial-overview/commercial-overview').then(
    (module) => module.CommercialOverview,
  );

export const commercialEngagementRoutes: Routes = [
  {
    path: '',
    loadComponent: commercialOverview,
    title: applicationTitle('Commercial management'),
  },
];
