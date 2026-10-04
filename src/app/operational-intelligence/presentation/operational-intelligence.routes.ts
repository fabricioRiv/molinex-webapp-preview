import { Routes } from '@angular/router';
import { applicationTitle } from '../../shared/presentation/application-title';

const intelligenceOverview = () =>
  import('./views/intelligence-overview/intelligence-overview').then(
    (module) => module.IntelligenceOverview,
  );

export const operationalIntelligenceRoutes: Routes = [
  {
    path: 'analysis',
    loadComponent: intelligenceOverview,
    title: applicationTitle('Operational intelligence'),
  },
];
