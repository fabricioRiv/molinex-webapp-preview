import { Component } from '@angular/core';
import {
  SectionCapability,
  SectionOverview,
} from '../../../../shared/presentation/components/section-overview/section-overview';

@Component({
  imports: [SectionOverview],
  selector: 'app-commercial-overview',
  styleUrl: './commercial-overview.css',
  templateUrl: './commercial-overview.html',
})
export class CommercialOverview {
  protected readonly capabilities = [
    {
      icon: 'contract',
      title: 'Planes comerciales',
      description: 'Organiza condiciones, vigencias y alcance de los planes ofrecidos por Molinex.',
    },
    {
      icon: 'contact_support',
      title: 'Consultas comerciales',
      description: 'Registra y atiende solicitudes manteniendo el contexto de cada cliente.',
    },
    {
      icon: 'conversion_path',
      title: 'Seguimiento',
      description: 'Conecta las oportunidades confirmadas con la planificación operativa.',
    },
  ] satisfies readonly SectionCapability[];
}
