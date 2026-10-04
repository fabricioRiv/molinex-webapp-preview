import { MeasurementUnit } from '../../production-quality-shared-kernel/domain/model/measurement-unit';
import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface WasteRecordsResponse extends BaseResponse {
  wasteRecords: WasteRecordResource[];
}

export interface WasteRecordResource extends BaseResource<string> {
  productionRecordId: number;
  quantityValue: number;
  quantityUnit: MeasurementUnit;
  baseWeightValue: number | null;
  baseWeightUnit: MeasurementUnit | null;
  percentage: number | null;
  recordedAt: string;
}
