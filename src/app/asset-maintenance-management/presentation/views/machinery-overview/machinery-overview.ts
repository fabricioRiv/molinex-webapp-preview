import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AssetMaintenanceStore } from '../../../application/asset-maintenance.store';

@Component({
  imports: [DatePipe, MatButtonModule, MatProgressSpinner, RouterLink, TranslatePipe],
  selector: 'app-machinery-overview',
  styleUrl: './machinery-overview.css',
  templateUrl: './machinery-overview.html',
})
export class MachineryOverview {
  protected readonly store = inject(AssetMaintenanceStore);
  protected readonly searchTerm = signal('');
  protected readonly filteredMachines = computed(() => {
    const searchTerm = this.searchTerm().trim().toLowerCase();
    if (!searchTerm) return this.store.machines();

    return this.store
      .machines()
      .filter((machine) =>
        [machine.code.value, machine.name, machine.model].some((value) =>
          value.toLowerCase().includes(searchTerm),
        ),
      );
  });

  protected updateSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }
}
