import { Routes } from '@angular/router';
import { applicationTitle } from '../../shared/presentation/application-title';

const qualityOverview = () =>
  import('./views/quality-overview/quality-overview').then((module) => module.QualityOverview);

export const qualityYieldControlRoutes: Routes = [
  {
    path: '',
    loadComponent: qualityOverview,
    title: applicationTitle('Calidad y rendimiento'),
  },
];
