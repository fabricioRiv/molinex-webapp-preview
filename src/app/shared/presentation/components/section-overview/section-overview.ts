import { Component, input } from '@angular/core';

export interface SectionCapability {
  readonly description: string;
  readonly icon: string;
  readonly title: string;
}

@Component({
  selector: 'app-section-overview',
  styleUrl: './section-overview.css',
  templateUrl: './section-overview.html',
})
export class SectionOverview {
  readonly capabilities = input.required<readonly SectionCapability[]>();
  readonly description = input.required<string>();
  readonly eyebrow = input.required<string>();
  readonly icon = input.required<string>();
  readonly title = input.required<string>();
}
