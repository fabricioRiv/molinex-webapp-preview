import { Component } from '@angular/core';
import {
  SectionCapability,
  SectionOverview,
} from '../../../../shared/presentation/components/section-overview/section-overview';

@Component({
  imports: [SectionOverview],
  selector: 'app-operational-overview',
  styleUrl: './operational-overview.css',
  templateUrl: './operational-overview.html',
})
export class OperationalOverview {
  protected readonly capabilities = [
    {
      icon: 'speed',
      title: 'Pulso operacional',
      description: 'Resume el estado del proceso productivo y sus señales más importantes.',
    },
    {
      icon: 'notification_important',
      title: 'Alertas prioritarias',
      description: 'Destaca condiciones que requieren atención para reducir impacto operativo.',
    },
    {
      icon: 'route',
      title: 'Accesos rápidos',
      description: 'Conecta a cada equipo con las tareas que necesita atender durante el turno.',
    },
  ] satisfies readonly SectionCapability[];
}
