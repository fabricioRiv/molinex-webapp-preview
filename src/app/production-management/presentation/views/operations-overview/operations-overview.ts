import { Component } from '@angular/core';
import {
  SectionCapability,
  SectionOverview,
} from '../../../../shared/presentation/components/section-overview/section-overview';

@Component({
  imports: [SectionOverview],
  selector: 'app-operations-overview',
  styleUrl: './operations-overview.css',
  templateUrl: './operations-overview.html',
})
export class OperationsOverview {
  protected readonly capabilities = [
    {
      icon: 'warehouse',
      title: 'Recepción de materia prima',
      description: 'Registra ingresos, pesos y condiciones iniciales de cada recepción de arroz.',
    },
    {
      icon: 'inventory_2',
      title: 'Lotes de producción',
      description: 'Agrupa y controla el material procesado durante cada ciclo productivo.',
    },
    {
      icon: 'assignment',
      title: 'Registros operativos',
      description:
        'Consolida movimientos, responsables y resultados de las operaciones ejecutadas.',
    },
  ] satisfies readonly SectionCapability[];
}
