import { Component } from '@angular/core';
import {
  SectionCapability,
  SectionOverview,
} from '../../../../shared/presentation/components/section-overview/section-overview';

@Component({
  imports: [SectionOverview],
  selector: 'app-reports-overview',
  styleUrl: './reports-overview.css',
  templateUrl: './reports-overview.html',
})
export class ReportsOverview {
  protected readonly capabilities = [
    {
      icon: 'dashboard',
      title: 'Indicadores ejecutivos',
      description: 'Presenta una lectura consolidada del desempeño del molino.',
    },
    {
      icon: 'summarize',
      title: 'Reportes operativos',
      description: 'Organiza información por periodo, proceso y responsabilidad.',
    },
    {
      icon: 'download',
      title: 'Exportación',
      description: 'Prepara resultados para su distribución y análisis externo.',
    },
  ] satisfies readonly SectionCapability[];
}
