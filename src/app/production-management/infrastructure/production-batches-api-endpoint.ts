import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { ProductionBatch } from '../domain/model/production-batch.entity';
import { ProductionBatchAssembler } from './production-batch-assembler';
import { ProductionBatchResource, ProductionBatchesResponse } from './production-batches.response';

export class ProductionBatchesApiEndpoint extends BaseApiEndpoint<
  ProductionBatch,
  ProductionBatchResource,
  ProductionBatchesResponse,
  ProductionBatchAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.apiBaseUrl}${environment.productionBatchesEndpointPath}`,
      new ProductionBatchAssembler(),
    );
  }
}
