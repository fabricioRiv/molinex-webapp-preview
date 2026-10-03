import { Routes } from '@angular/router';
import { applicationTitle } from '../../shared/presentation/application-title';

const operationalOverview = () =>
  import('./views/operational-overview/operational-overview').then(
    (module) => module.OperationalOverview,
  );
const intelligenceOverview = () =>
  import('./views/intelligence-overview/intelligence-overview').then(
    (module) => module.IntelligenceOverview,
  );

export const operationalIntelligenceRoutes: Routes = [
  {
    path: 'overview',
    loadComponent: operationalOverview,
    title: applicationTitle('Operational overview'),
  },
  {
    path: 'analysis',
    loadComponent: intelligenceOverview,
    title: applicationTitle('Operational intelligence'),
  },
];
