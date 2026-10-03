import { Component } from '@angular/core';
import { SectionOverview } from '../../../../shared/presentation/components/section-overview/section-overview';

@Component({
  imports: [SectionOverview],
  selector: 'app-operational-overview',
  styleUrl: './operational-overview.css',
  templateUrl: './operational-overview.html',
})
export class OperationalOverview {}
