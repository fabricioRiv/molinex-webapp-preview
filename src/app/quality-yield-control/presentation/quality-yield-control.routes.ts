import { Routes } from '@angular/router';
import { applicationTitle } from '../../shared/presentation/application-title';

const qualityOverview = () =>
  import('./views/quality-overview/quality-overview').then((module) => module.QualityOverview);
const qualityAssessmentForm = () =>
  import('./views/quality-assessment-form/quality-assessment-form').then(
    (module) => module.QualityAssessmentForm,
  );
const wasteOverview = () =>
  import('./views/waste-overview/waste-overview').then((module) => module.WasteOverview);
const wasteRecordForm = () =>
  import('./views/waste-record-form/waste-record-form').then((module) => module.WasteRecordForm);

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
  {
    path: 'waste',
    pathMatch: 'full',
    loadComponent: wasteOverview,
    title: applicationTitle('Production waste'),
  },
  {
    path: 'waste/new',
    loadComponent: wasteRecordForm,
    title: applicationTitle('Record production waste'),
  },
];
