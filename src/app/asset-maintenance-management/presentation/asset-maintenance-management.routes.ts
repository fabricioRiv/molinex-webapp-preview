import { Routes } from '@angular/router';
import { applicationTitle } from '../../shared/presentation/application-title';

const machineryOverview = () =>
  import('./views/machinery-overview/machinery-overview').then(
    (module) => module.MachineryOverview,
  );
const maintenanceOverview = () =>
  import('./views/maintenance-overview/maintenance-overview').then(
    (module) => module.MaintenanceOverview,
  );

export const assetMaintenanceManagementRoutes: Routes = [
  {
    path: 'machinery',
    loadComponent: machineryOverview,
    title: applicationTitle('Maquinaria'),
  },
  {
    path: 'maintenance',
    loadComponent: maintenanceOverview,
    title: applicationTitle('Mantenimiento'),
  },
];
