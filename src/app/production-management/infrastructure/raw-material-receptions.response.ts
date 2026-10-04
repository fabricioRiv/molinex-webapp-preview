import { MeasurementUnit } from '../../production-quality-shared-kernel/domain/model/measurement-unit';
import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface RawMaterialReceptionsResponse extends BaseResponse {
  rawMaterialReceptions: RawMaterialReceptionResource[];
}

export interface RawMaterialReceptionResource extends BaseResource<number> {
  receivedAt: string;
  supplierName: string;
  originDescription: string;
  quantityValue: number;
  quantityUnit: MeasurementUnit;
}
