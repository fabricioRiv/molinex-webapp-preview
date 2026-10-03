import { computed, DestroyRef, inject, Injectable, Signal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';
import { ProductionBatch } from '../domain/model/production-batch.entity';
import { RawMaterialReception } from '../domain/model/raw-material-reception.entity';
import { ProductionManagementApi } from '../infrastructure/production-management-api';

const REQUEST_RETRY_COUNT = 2;

export type ProductionBatchOperationError =
  'create' | 'delete' | 'load-batches' | 'load-receptions' | 'update';

@Injectable({ providedIn: 'root' })
export class ProductionManagementStore {
  readonly #productionManagementApi = inject(ProductionManagementApi);
  readonly #destroyRef = inject(DestroyRef);
  readonly #productionBatchesSignal = signal<ProductionBatch[]>([]);
  readonly productionBatches = this.#productionBatchesSignal.asReadonly();
  readonly productionBatchCount = computed(() => this.productionBatches().length);
  readonly #rawMaterialReceptionsSignal = signal<RawMaterialReception[]>([]);
  readonly rawMaterialReceptions = this.#rawMaterialReceptionsSignal.asReadonly();
  readonly rawMaterialReceptionMap = computed(
    () => new Map(this.rawMaterialReceptions().map((reception) => [reception.id, reception])),
  );
  readonly #pendingRequestCount = signal(0);
  readonly loading = computed(() => this.#pendingRequestCount() > 0);
  readonly #errorSignal = signal<ProductionBatchOperationError | null>(null);
  readonly error = this.#errorSignal.asReadonly();

  constructor() {
    this.#loadProductionBatches();
    this.#loadRawMaterialReceptions();
  }

  getProductionBatchById(id: number): Signal<ProductionBatch | undefined> {
    return computed(() => this.productionBatches().find((batch) => batch.id === id));
  }

  addProductionBatch(productionBatch: ProductionBatch): void {
    this.#startRequest();
    this.#productionManagementApi
      .createProductionBatch(productionBatch)
      .pipe(retry(REQUEST_RETRY_COUNT))
      .subscribe({
        next: (createdProductionBatch) => {
          this.#productionBatchesSignal.update((batches) => [...batches, createdProductionBatch]);
          this.#completeRequest();
        },
        error: () => this.#failRequest('create'),
      });
  }

  updateProductionBatch(updatedProductionBatch: ProductionBatch): void {
    this.#startRequest();
    this.#productionManagementApi
      .updateProductionBatch(updatedProductionBatch)
      .pipe(retry(REQUEST_RETRY_COUNT))
      .subscribe({
        next: (productionBatch) => {
          this.#productionBatchesSignal.update((batches) =>
            batches.map((batch) => (batch.id === productionBatch.id ? productionBatch : batch)),
          );
          this.#completeRequest();
        },
        error: () => this.#failRequest('update'),
      });
  }

  deleteProductionBatch(id: number): void {
    this.#startRequest();
    this.#productionManagementApi
      .deleteProductionBatch(id)
      .pipe(retry(REQUEST_RETRY_COUNT))
      .subscribe({
        next: () => {
          this.#productionBatchesSignal.update((batches) =>
            batches.filter((batch) => batch.id !== id),
          );
          this.#completeRequest();
        },
        error: () => this.#failRequest('delete'),
      });
  }

  reloadProductionData(): void {
    this.#loadProductionBatches();
    this.#loadRawMaterialReceptions();
  }

  #loadProductionBatches(): void {
    this.#startRequest();
    this.#productionManagementApi
      .getProductionBatches()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (productionBatches) => {
          this.#productionBatchesSignal.set(productionBatches);
          this.#completeRequest();
        },
        error: () => this.#failRequest('load-batches'),
      });
  }

  #loadRawMaterialReceptions(): void {
    this.#startRequest();
    this.#productionManagementApi
      .getRawMaterialReceptions()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (rawMaterialReceptions) => {
          this.#rawMaterialReceptionsSignal.set(rawMaterialReceptions);
          this.#completeRequest();
        },
        error: () => this.#failRequest('load-receptions'),
      });
  }

  #startRequest(): void {
    this.#pendingRequestCount.update((count) => count + 1);
    this.#errorSignal.set(null);
  }

  #completeRequest(): void {
    this.#pendingRequestCount.update((count) => Math.max(0, count - 1));
  }

  #failRequest(error: ProductionBatchOperationError): void {
    this.#errorSignal.set(error);
    this.#completeRequest();
  }
}
