import { Routes } from '@angular/router';
import { applicationTitle } from '../../shared/presentation/application-title';

const reportsOverview = () =>
  import('./views/reports-overview/reports-overview').then((module) => module.ReportsOverview);

export const reportingAnalyticsRoutes: Routes = [
  {
    path: '',
    loadComponent: reportsOverview,
    title: applicationTitle('Reportes y analítica'),
  },
];
