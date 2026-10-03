import { Component, output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  imports: [MatToolbarModule],
  selector: 'app-top-bar',
  styleUrl: './top-bar.css',
  templateUrl: './top-bar.html',
})
export class TopBar {
  readonly menuToggled = output<void>();

  protected readonly formattedDate = new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date());
}
