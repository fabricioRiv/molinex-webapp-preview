import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { ProductionBatch } from '../domain/model/production-batch.entity';
import { ProductionRecord } from '../domain/model/production-record.entity';
import { RawMaterialReception } from '../domain/model/raw-material-reception.entity';
import { ProductionBatchesApiEndpoint } from './production-batches-api-endpoint';
import { ProductionRecordsApiEndpoint } from './production-records-api-endpoint';
import { RawMaterialReceptionsApiEndpoint } from './raw-material-receptions-api-endpoint';

@Injectable({ providedIn: 'root' })
export class ProductionManagementApi extends BaseApi {
  readonly #productionBatchesEndpoint = new ProductionBatchesApiEndpoint(this.http);
  readonly #productionRecordsEndpoint = new ProductionRecordsApiEndpoint(this.http);
  readonly #rawMaterialReceptionsEndpoint = new RawMaterialReceptionsApiEndpoint(this.http);

  getRawMaterialReceptions(): Observable<RawMaterialReception[]> {
    return this.#rawMaterialReceptionsEndpoint.getAll();
  }

  createRawMaterialReception(
    rawMaterialReception: RawMaterialReception,
  ): Observable<RawMaterialReception> {
    return this.#rawMaterialReceptionsEndpoint.create(rawMaterialReception);
  }

  getProductionBatches(): Observable<ProductionBatch[]> {
    return this.#productionBatchesEndpoint.getAll();
  }

  getProductionBatch(id: number): Observable<ProductionBatch> {
    return this.#productionBatchesEndpoint.getById(id);
  }

  createProductionBatch(productionBatch: ProductionBatch): Observable<ProductionBatch> {
    return this.#productionBatchesEndpoint.create(productionBatch);
  }

  getProductionRecords(): Observable<ProductionRecord[]> {
    return this.#productionRecordsEndpoint.getAll();
  }

  createProductionRecord(productionRecord: ProductionRecord): Observable<ProductionRecord> {
    return this.#productionRecordsEndpoint.create(productionRecord);
  }

  updateProductionRecord(productionRecord: ProductionRecord): Observable<ProductionRecord> {
    return this.#productionRecordsEndpoint.update(productionRecord, productionRecord.id);
  }
}
