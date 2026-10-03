import { Weight } from '../../production-quality-shared-kernel/domain/model/weight';
import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { RawMaterialReception } from '../domain/model/raw-material-reception.entity';
import {
  RawMaterialReceptionResource,
  RawMaterialReceptionsResponse,
} from './raw-material-receptions.response';

export class RawMaterialReceptionAssembler implements BaseAssembler<
  RawMaterialReception,
  RawMaterialReceptionResource,
  RawMaterialReceptionsResponse
> {
  toEntitiesFromResponse(response: RawMaterialReceptionsResponse): RawMaterialReception[] {
    return response.rawMaterialReceptions.map((resource) => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: RawMaterialReceptionResource): RawMaterialReception {
    return new RawMaterialReception({
      id: resource.id,
      receivedAt: new Date(resource.receivedAt),
      supplierName: resource.supplierName,
      originDescription: resource.originDescription,
      quantity: new Weight(resource.quantityValue, resource.quantityUnit),
    });
  }

  toResourceFromEntity(entity: RawMaterialReception): RawMaterialReceptionResource {
    return {
      id: entity.id,
      receivedAt: entity.receivedAt.toISOString(),
      supplierName: entity.supplierName,
      originDescription: entity.originDescription,
      quantityValue: entity.quantity.value,
      quantityUnit: entity.quantity.unit,
    };
  }
}
