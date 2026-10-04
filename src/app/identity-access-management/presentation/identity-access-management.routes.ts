import { Routes } from '@angular/router';
import { applicationTitle } from '../../shared/presentation/application-title';

const usersOverview = () =>
  import('./views/users-overview/users-overview').then((module) => module.UsersOverview);

export const identityAccessManagementRoutes: Routes = [
  {
    path: 'users',
    loadComponent: usersOverview,
    title: applicationTitle('Users and permissions'),
  },
];
