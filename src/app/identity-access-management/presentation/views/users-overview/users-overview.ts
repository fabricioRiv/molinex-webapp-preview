import { Component } from '@angular/core';
import {
  SectionCapability,
  SectionOverview,
} from '../../../../shared/presentation/components/section-overview/section-overview';

@Component({
  imports: [SectionOverview],
  selector: 'app-users-overview',
  styleUrl: './users-overview.css',
  templateUrl: './users-overview.html',
})
export class UsersOverview {
  protected readonly capabilities = [
    {
      icon: 'group',
      title: 'Usuarios',
      description: 'Mantiene las cuentas de las personas que operan y supervisan la plataforma.',
    },
    {
      icon: 'admin_panel_settings',
      title: 'Roles y permisos',
      description: 'Define el acceso autorizado para cada responsabilidad dentro del molino.',
    },
    {
      icon: 'shield_lock',
      title: 'Acceso seguro',
      description:
        'Protege rutas y acciones sensibles mediante sesiones y políticas de autorización.',
    },
  ] satisfies readonly SectionCapability[];
}
