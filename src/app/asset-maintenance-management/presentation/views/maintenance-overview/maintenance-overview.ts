import { Component } from '@angular/core';
import { SectionOverview } from '../../../../shared/presentation/components/section-overview/section-overview';

@Component({
  imports: [SectionOverview],
  selector: 'app-maintenance-overview',
  styleUrl: './maintenance-overview.css',
  templateUrl: './maintenance-overview.html',
})
export class MaintenanceOverview {}
