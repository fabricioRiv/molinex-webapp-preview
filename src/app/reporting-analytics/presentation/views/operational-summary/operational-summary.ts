import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { TranslatePipe } from '@ngx-translate/core';
import { ReportingAnalyticsStore } from '../../../application/reporting-analytics.store';

@Component({
  imports: [DatePipe, DecimalPipe, MatButton, MatProgressSpinner, TranslatePipe],
  selector: 'app-operational-summary',
  styleUrl: './operational-summary.css',
  templateUrl: './operational-summary.html',
})
export class OperationalSummaryView {
  protected readonly store = inject(ReportingAnalyticsStore);
}
