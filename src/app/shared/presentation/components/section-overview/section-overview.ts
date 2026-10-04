import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-section-overview',
  styleUrl: './section-overview.css',
  templateUrl: './section-overview.html',
})
export class SectionOverview {
  readonly description = input.required<string>();
  readonly icon = input.required<string>();
  readonly title = input.required<string>();
}
