import { Routes } from '@angular/router';
import { applicationTitle } from '../../shared/presentation/application-title';

const productionBatchList = () =>
  import('./views/production-batch-list/production-batch-list').then(
    (module) => module.ProductionBatchList,
  );
const productionBatchForm = () =>
  import('./views/production-batch-form/production-batch-form').then(
    (module) => module.ProductionBatchForm,
  );

export const productionManagementRoutes: Routes = [
  {
    path: '',
    loadComponent: productionBatchList,
    title: applicationTitle('Production batches'),
  },
  {
    path: 'batches/new',
    loadComponent: productionBatchForm,
    title: applicationTitle('New production batch'),
  },
  {
    path: 'batches/:id/edit',
    loadComponent: productionBatchForm,
    title: applicationTitle('Edit production batch'),
  },
];
