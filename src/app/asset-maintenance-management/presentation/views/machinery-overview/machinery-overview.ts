import { Component } from '@angular/core';
import {
  SectionCapability,
  SectionOverview,
} from '../../../../shared/presentation/components/section-overview/section-overview';

@Component({
  imports: [SectionOverview],
  selector: 'app-machinery-overview',
  styleUrl: './machinery-overview.css',
  templateUrl: './machinery-overview.html',
})
export class MachineryOverview {
  protected readonly capabilities = [
    {
      icon: 'precision_manufacturing',
      title: 'Inventario de maquinaria',
      description:
        'Centraliza la identificación, ubicación y condición de los activos productivos.',
    },
    {
      icon: 'sensors',
      title: 'Estado operativo',
      description: 'Permite conocer la disponibilidad y situación actual de cada máquina.',
    },
    {
      icon: 'history',
      title: 'Historial del activo',
      description: 'Conserva la trazabilidad de eventos y cambios relevantes de cada equipo.',
    },
  ] satisfies readonly SectionCapability[];
}
