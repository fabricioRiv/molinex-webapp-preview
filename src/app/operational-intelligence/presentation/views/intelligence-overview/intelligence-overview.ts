import { Component } from '@angular/core';
import {
  SectionCapability,
  SectionOverview,
} from '../../../../shared/presentation/components/section-overview/section-overview';

@Component({
  imports: [SectionOverview],
  selector: 'app-intelligence-overview',
  styleUrl: './intelligence-overview.css',
  templateUrl: './intelligence-overview.html',
})
export class IntelligenceOverview {
  protected readonly capabilities = [
    {
      icon: 'sensors',
      title: 'Lecturas operativas',
      description:
        'Organiza mediciones relevantes para comprender el comportamiento de la operación.',
    },
    {
      icon: 'warning',
      title: 'Detección de alertas',
      description: 'Identifica desviaciones y comunica su prioridad a las áreas responsables.',
    },
    {
      icon: 'lightbulb',
      title: 'Recomendaciones',
      description: 'Transforma señales operativas en acciones sugeridas y explicables.',
    },
  ] satisfies readonly SectionCapability[];
}
