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
const rawMaterialReceptionList = () =>
  import('./views/raw-material-reception-list/raw-material-reception-list').then(
    (module) => module.RawMaterialReceptionList,
  );
const rawMaterialReceptionForm = () =>
  import('./views/raw-material-reception-form/raw-material-reception-form').then(
    (module) => module.RawMaterialReceptionForm,
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
    path: 'receptions',
    loadComponent: rawMaterialReceptionList,
    title: applicationTitle('Raw material receptions'),
  },
  {
    path: 'receptions/new',
    loadComponent: rawMaterialReceptionForm,
    title: applicationTitle('New raw material reception'),
  },
];
