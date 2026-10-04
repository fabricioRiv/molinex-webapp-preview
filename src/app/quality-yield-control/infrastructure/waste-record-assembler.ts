import { Weight } from '../../production-quality-shared-kernel/domain/model/weight';
import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { WasteRecord } from '../domain/model/waste-record.entity';
import { WasteRecordResource, WasteRecordsResponse } from './waste-records.response';

export class WasteRecordAssembler implements BaseAssembler<
  WasteRecord,
  WasteRecordResource,
  WasteRecordsResponse
> {
  toEntitiesFromResponse(response: WasteRecordsResponse): WasteRecord[] {
    return response.wasteRecords.map((resource) => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: WasteRecordResource): WasteRecord {
    return new WasteRecord({
      id: resource.id,
      productionRecordId: resource.productionRecordId,
      quantity: new Weight(resource.quantityValue, resource.quantityUnit),
      baseWeight:
        resource.baseWeightValue !== null && resource.baseWeightUnit !== null
          ? new Weight(resource.baseWeightValue, resource.baseWeightUnit)
          : null,
      recordedAt: new Date(resource.recordedAt),
    });
  }

  toResourceFromEntity(entity: WasteRecord): WasteRecordResource {
    return {
      id: entity.id,
      productionRecordId: entity.productionRecordId,
      quantityValue: entity.quantity.value,
      quantityUnit: entity.quantity.unit,
      baseWeightValue: entity.baseWeight?.value ?? null,
      baseWeightUnit: entity.baseWeight?.unit ?? null,
      percentage: entity.percentage?.value ?? null,
      recordedAt: entity.recordedAt.toISOString(),
    };
  }
}
