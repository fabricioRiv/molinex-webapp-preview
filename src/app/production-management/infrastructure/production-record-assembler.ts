import { Weight } from '../../production-quality-shared-kernel/domain/model/weight';
import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { ProductionDetails } from '../domain/model/production-details';
import { ProductionRecord } from '../domain/model/production-record.entity';
import { ProductionRecordResource, ProductionRecordsResponse } from './production-records.response';

export class ProductionRecordAssembler implements BaseAssembler<
  ProductionRecord,
  ProductionRecordResource,
  ProductionRecordsResponse
> {
  toEntitiesFromResponse(response: ProductionRecordsResponse): ProductionRecord[] {
    return response.productionRecords.map((resource) => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: ProductionRecordResource): ProductionRecord {
    return new ProductionRecord({
      id: resource.id,
      batchId: resource.batchId,
      details: new ProductionDetails({
        processName: resource.processName,
        processedWeight: new Weight(resource.processedWeightValue, resource.processedWeightUnit),
        startedAt: new Date(resource.startedAt),
        finishedAt: resource.finishedAt ? new Date(resource.finishedAt) : null,
        status: resource.status,
      }),
      recordedAt: new Date(resource.recordedAt),
    });
  }

  toResourceFromEntity(entity: ProductionRecord): ProductionRecordResource {
    return {
      id: entity.id,
      batchId: entity.batchId,
      processName: entity.details.processName,
      processedWeightValue: entity.details.processedWeight.value,
      processedWeightUnit: entity.details.processedWeight.unit,
      startedAt: entity.details.startedAt.toISOString(),
      finishedAt: entity.details.finishedAt?.toISOString() ?? null,
      status: entity.details.status,
      recordedAt: entity.recordedAt.toISOString(),
    };
  }
}
