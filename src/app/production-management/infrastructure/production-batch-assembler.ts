import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { ProductionBatch } from '../domain/model/production-batch.entity';
import { ProductionBatchResource, ProductionBatchesResponse } from './production-batches.response';

export class ProductionBatchAssembler implements BaseAssembler<
  ProductionBatch,
  ProductionBatchResource,
  ProductionBatchesResponse
> {
  toEntitiesFromResponse(response: ProductionBatchesResponse): ProductionBatch[] {
    return response.productionBatches.map((resource) => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: ProductionBatchResource): ProductionBatch {
    return new ProductionBatch({
      id: resource.id,
      code: resource.code,
      receptionId: resource.receptionId,
      registeredAt: new Date(resource.registeredAt),
    });
  }

  toResourceFromEntity(entity: ProductionBatch): ProductionBatchResource {
    return {
      id: entity.id,
      code: entity.code,
      receptionId: entity.receptionId,
      registeredAt: entity.registeredAt.toISOString(),
    };
  }
}
