import { Component } from '@angular/core';
import { SectionOverview } from '../../../../shared/presentation/components/section-overview/section-overview';

@Component({
  imports: [SectionOverview],
  selector: 'app-operations-overview',
  styleUrl: './operations-overview.css',
  templateUrl: './operations-overview.html',
})
export class OperationsOverview {}
