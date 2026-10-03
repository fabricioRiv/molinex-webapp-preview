import { Component } from '@angular/core';
import {
  SectionCapability,
  SectionOverview,
} from '../../../../shared/presentation/components/section-overview/section-overview';

@Component({
  imports: [SectionOverview],
  selector: 'app-maintenance-overview',
  styleUrl: './maintenance-overview.css',
  templateUrl: './maintenance-overview.html',
})
export class MaintenanceOverview {
  protected readonly capabilities = [
    {
      icon: 'event_repeat',
      title: 'Planificación preventiva',
      description: 'Programa intervenciones antes de que una condición afecte la producción.',
    },
    {
      icon: 'engineering',
      title: 'Órdenes de mantenimiento',
      description: 'Organiza las actividades, responsables y recursos de cada intervención.',
    },
    {
      icon: 'task_alt',
      title: 'Seguimiento de ejecución',
      description:
        'Registra resultados y devuelve cada activo a una condición operativa verificable.',
    },
  ] satisfies readonly SectionCapability[];
}
