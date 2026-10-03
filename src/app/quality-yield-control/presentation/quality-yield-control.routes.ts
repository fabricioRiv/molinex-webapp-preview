import { Routes } from '@angular/router';
import { applicationTitle } from '../../shared/presentation/application-title';

const qualityOverview = () =>
  import('./views/quality-overview/quality-overview').then((module) => module.QualityOverview);
const qualityAssessmentForm = () =>
  import('./views/quality-assessment-form/quality-assessment-form').then(
    (module) => module.QualityAssessmentForm,
  );

export const qualityYieldControlRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: qualityOverview,
    title: applicationTitle('Quality and yield'),
  },
  {
    path: 'assessments/new',
    loadComponent: qualityAssessmentForm,
    title: applicationTitle('New quality assessment'),
  },
];
