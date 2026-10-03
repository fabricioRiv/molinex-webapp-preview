import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ProductionManagementStore } from '../../../application/production-management.store';

@Component({
  imports: [
    DatePipe,
    DecimalPipe,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginator,
    MatProgressSpinner,
    MatSort,
    MatSortHeader,
    MatTableModule,
    TranslatePipe,
  ],
  selector: 'app-raw-material-reception-list',
  styleUrl: './raw-material-reception-list.css',
  templateUrl: './raw-material-reception-list.html',
})
export class RawMaterialReceptionList {
  protected readonly store = inject(ProductionManagementStore);
  readonly #router = inject(Router);
  protected readonly displayedColumns = [
    'id',
    'receivedAt',
    'supplier',
    'origin',
    'quantity',
  ];
  protected readonly sort = viewChild(MatSort);
  protected readonly paginator = viewChild(MatPaginator);
  protected readonly searchTerm = signal('');
  protected readonly receivedTodayCount = computed(() => {
    const today = new Date();
    return this.store
      .rawMaterialReceptions()
      .filter((reception) => this.#isSameLocalDate(reception.receivedAt, today)).length;
  });
  protected readonly supplierCount = computed(
    () =>
      new Set(
        this.store
          .rawMaterialReceptions()
          .map((reception) => reception.supplierName.trim().toLocaleLowerCase()),
      ).size,
  );
  protected readonly filteredReceptions = computed(() => {
    const searchTerm = this.searchTerm().trim().toLocaleLowerCase();
    if (!searchTerm) return this.store.rawMaterialReceptions();

    return this.store.rawMaterialReceptions().filter((reception) =>
      [reception.id.toString(), reception.supplierName, reception.originDescription].some((value) =>
        value.toLocaleLowerCase().includes(searchTerm),
      ),
    );
  });
  protected readonly dataSource = computed(() => {
    const source = new MatTableDataSource(this.filteredReceptions());
    const sort = this.sort();
    const paginator = this.paginator();

    source.sortingDataAccessor = (reception, column) => {
      if (column === 'receivedAt') return reception.receivedAt.getTime();
      if (column === 'supplier') return reception.supplierName;
      if (column === 'origin') return reception.originDescription;
      if (column === 'quantity') return reception.quantity.value;
      return reception.id;
    };

    if (sort) source.sort = sort;
    if (paginator) source.paginator = paginator;

    return source;
  });

  protected navigateToNew(): void {
    this.#router.navigate(['/production/receptions/new']).then();
  }

  protected navigateToBatches(): void {
    this.#router.navigate(['/production/batches']).then();
  }

  protected updateSearchTerm(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  protected measurementUnitSymbol(unit: string): string {
    return unit === 'METRIC_TON' ? 't' : 'kg';
  }

  #isSameLocalDate(first: Date, second: Date): boolean {
    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    );
  }
}
