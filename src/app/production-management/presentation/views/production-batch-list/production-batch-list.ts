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
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ProductionManagementStore } from '../../../application/production-management.store';
import { ProductionBatch } from '../../../domain/model/production-batch.entity';

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
  selector: 'app-production-batch-list',
  styleUrl: './production-batch-list.css',
  templateUrl: './production-batch-list.html',
})
export class ProductionBatchList {
  protected readonly store = inject(ProductionManagementStore);
  readonly #router = inject(Router);
  readonly #translate = inject(TranslateService);
  protected readonly displayedColumns = [
    'code',
    'reception',
    'supplier',
    'quantity',
    'registeredAt',
    'actions',
  ];
  protected readonly sort = viewChild(MatSort);
  protected readonly paginator = viewChild(MatPaginator);
  protected readonly searchTerm = signal('');
  protected readonly linkedReceptionCount = computed(() => {
    const receptionMap = this.store.rawMaterialReceptionMap();
    return new Set(
      this.store
        .productionBatches()
        .filter((batch) => receptionMap.has(batch.receptionId))
        .map((batch) => batch.receptionId),
    ).size;
  });
  protected readonly registeredTodayCount = computed(() => {
    const today = new Date();
    return this.store
      .productionBatches()
      .filter((batch) => this.#isSameLocalDate(batch.registeredAt, today)).length;
  });
  protected readonly filteredProductionBatches = computed(() => {
    const searchTerm = this.searchTerm().trim().toLocaleLowerCase();
    if (!searchTerm) return this.store.productionBatches();

    const receptionMap = this.store.rawMaterialReceptionMap();
    return this.store.productionBatches().filter((batch) => {
      const reception = receptionMap.get(batch.receptionId);
      return [
        batch.code,
        batch.receptionId.toString(),
        reception?.supplierName ?? '',
        reception?.originDescription ?? '',
      ].some((value) => value.toLocaleLowerCase().includes(searchTerm));
    });
  });

  protected readonly dataSource = computed(() => {
    const source = new MatTableDataSource(this.filteredProductionBatches());
    const sort = this.sort();
    const paginator = this.paginator();

    source.sortingDataAccessor = (batch, column) => {
      if (column === 'reception') return batch.receptionId;
      return column === 'registeredAt' ? batch.registeredAt.getTime() : batch.code;
    };

    if (sort) source.sort = sort;
    if (paginator) source.paginator = paginator;

    return source;
  });

  protected navigateToNew(): void {
    this.#router.navigate(['/production/batches/new']).then();
  }

  protected updateSearchTerm(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  protected measurementUnitSymbol(unit: string): string {
    return unit === 'METRIC_TON' ? 't' : 'kg';
  }

  protected editProductionBatch(id: number): void {
    this.#router.navigate(['/production/batches', id, 'edit']).then();
  }

  protected deleteProductionBatch(productionBatch: ProductionBatch): void {
    const confirmed = window.confirm(
      this.#translate.instant('production-batches.confirm-delete', {
        code: productionBatch.code,
      }),
    );

    if (confirmed) {
      this.store.deleteProductionBatch(productionBatch.id);
    }
  }

  #isSameLocalDate(first: Date, second: Date): boolean {
    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    );
  }
}
