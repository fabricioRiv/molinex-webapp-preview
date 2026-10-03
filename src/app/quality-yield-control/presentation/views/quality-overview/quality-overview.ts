import { Component } from '@angular/core';
import {
  SectionCapability,
  SectionOverview,
} from '../../../../shared/presentation/components/section-overview/section-overview';

@Component({
  imports: [SectionOverview],
  selector: 'app-quality-overview',
  styleUrl: './quality-overview.css',
  templateUrl: './quality-overview.html',
})
export class QualityOverview {
  protected readonly capabilities = [
    {
      icon: 'science',
      title: 'Resultados de calidad',
      description: 'Registra evaluaciones y parámetros de calidad vinculados a los lotes.',
    },
    {
      icon: 'percent',
      title: 'Control de rendimiento',
      description: 'Compara materia prima, producto obtenido y rendimiento esperado.',
    },
    {
      icon: 'delete_sweep',
      title: 'Gestión de desperdicios',
      description: 'Identifica pérdidas y facilita acciones para mejorar el proceso productivo.',
    },
  ] satisfies readonly SectionCapability[];
}
