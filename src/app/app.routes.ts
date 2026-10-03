import { Routes } from '@angular/router';
import { applicationTitle } from './shared/presentation/application-title';

const commercialEngagementRoutes = () =>
  import('./commercial-engagement/presentation/commercial-engagement.routes').then(
    (module) => module.commercialEngagementRoutes,
  );
const identityAccessManagementRoutes = () =>
  import('./identity-access-management/presentation/identity-access-management.routes').then(
    (module) => module.identityAccessManagementRoutes,
  );
const productionManagementRoutes = () =>
  import('./production-management/presentation/production-management.routes').then(
    (module) => module.productionManagementRoutes,
  );
const qualityYieldControlRoutes = () =>
  import('./quality-yield-control/presentation/quality-yield-control.routes').then(
    (module) => module.qualityYieldControlRoutes,
  );
const assetMaintenanceManagementRoutes = () =>
  import('./asset-maintenance-management/presentation/asset-maintenance-management.routes').then(
    (module) => module.assetMaintenanceManagementRoutes,
  );
const operationalIntelligenceRoutes = () =>
  import('./operational-intelligence/presentation/operational-intelligence.routes').then(
    (module) => module.operationalIntelligenceRoutes,
  );
const reportingAnalyticsRoutes = () =>
  import('./reporting-analytics/presentation/reporting-analytics.routes').then(
    (module) => module.reportingAnalyticsRoutes,
  );
const operationalSummary = () =>
  import('./reporting-analytics/presentation/views/operational-summary/operational-summary').then(
    (module) => module.OperationalSummaryView,
  );
const pageNotFound = () =>
  import('./shared/presentation/views/page-not-found/page-not-found').then(
    (module) => module.PageNotFound,
  );

export const routes: Routes = [
  { path: 'commercial', loadChildren: commercialEngagementRoutes },
  { path: 'iam', loadChildren: identityAccessManagementRoutes },
  { path: 'production', loadChildren: productionManagementRoutes },
  { path: 'quality', loadChildren: qualityYieldControlRoutes },
  { path: 'assets', loadChildren: assetMaintenanceManagementRoutes },
  { path: 'intelligence', loadChildren: operationalIntelligenceRoutes },
  {
    path: 'overview',
    loadComponent: operationalSummary,
    title: applicationTitle('Operational overview'),
  },
  { path: 'reporting', loadChildren: reportingAnalyticsRoutes },
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: pageNotFound,
    title: applicationTitle('Page not found'),
  },
];
