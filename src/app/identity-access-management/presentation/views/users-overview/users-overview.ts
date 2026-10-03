import { Component } from '@angular/core';
import { SectionOverview } from '../../../../shared/presentation/components/section-overview/section-overview';

@Component({
  imports: [SectionOverview],
  selector: 'app-users-overview',
  styleUrl: './users-overview.css',
  templateUrl: './users-overview.html',
})
export class UsersOverview {}
