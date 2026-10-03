import { Routes } from '@angular/router';
import { applicationTitle } from '../../shared/presentation/application-title';

const operationsOverview = () =>
  import('./views/operations-overview/operations-overview').then(
    (module) => module.OperationsOverview,
  );

export const productionManagementRoutes: Routes = [
  {
    path: '',
    loadComponent: operationsOverview,
    title: applicationTitle('Operaciones'),
  },
];
