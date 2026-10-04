import { Routes } from '@angular/router';
import { applicationTitle } from '../../shared/presentation/application-title';

const machineryOverview = () =>
  import('./views/machinery-overview/machinery-overview').then(
    (module) => module.MachineryOverview,
  );
const machineForm = () =>
  import('./views/machine-form/machine-form').then((module) => module.MachineForm);
const maintenanceOverview = () =>
  import('./views/maintenance-overview/maintenance-overview').then(
    (module) => module.MaintenanceOverview,
  );
const preventiveMaintenanceForm = () =>
  import('./views/preventive-maintenance-form/preventive-maintenance-form').then(
    (module) => module.PreventiveMaintenanceForm,
  );
const correctiveMaintenanceForm = () =>
  import('./views/corrective-maintenance-form/corrective-maintenance-form').then(
    (module) => module.CorrectiveMaintenanceForm,
  );

export const assetMaintenanceManagementRoutes: Routes = [
  {
    path: 'machinery',
    pathMatch: 'full',
    loadComponent: machineryOverview,
    title: applicationTitle('Machinery'),
  },
  {
    path: 'machinery/new',
    loadComponent: machineForm,
    title: applicationTitle('Register machinery'),
  },
  {
    path: 'maintenance',
    pathMatch: 'full',
    loadComponent: maintenanceOverview,
    title: applicationTitle('Maintenance'),
  },
  {
    path: 'maintenance/preventive/new',
    loadComponent: preventiveMaintenanceForm,
    title: applicationTitle('Schedule preventive maintenance'),
  },
  {
    path: 'maintenance/corrective/new',
    loadComponent: correctiveMaintenanceForm,
    title: applicationTitle('Record corrective maintenance'),
  },
];
