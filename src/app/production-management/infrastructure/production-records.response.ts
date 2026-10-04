import { MeasurementUnit } from '../../production-quality-shared-kernel/domain/model/measurement-unit';
import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { ProductionStatus } from '../domain/model/production-status';

export interface ProductionRecordsResponse extends BaseResponse {
  productionRecords: ProductionRecordResource[];
}

export interface ProductionRecordResource extends BaseResource<number> {
  batchId: number;
  processName: string;
  processedWeightValue: number;
  processedWeightUnit: MeasurementUnit;
  startedAt: string;
  finishedAt: string | null;
  status: ProductionStatus;
  recordedAt: string;
}
