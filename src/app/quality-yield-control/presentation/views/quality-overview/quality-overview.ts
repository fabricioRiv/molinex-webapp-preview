import { Component } from '@angular/core';
import { SectionOverview } from '../../../../shared/presentation/components/section-overview/section-overview';

@Component({
  imports: [SectionOverview],
  selector: 'app-quality-overview',
  styleUrl: './quality-overview.css',
  templateUrl: './quality-overview.html',
})
export class QualityOverview {}
