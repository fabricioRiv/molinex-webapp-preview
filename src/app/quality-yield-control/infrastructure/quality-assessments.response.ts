import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { MeasurementUnit } from '../../production-quality-shared-kernel/domain/model/measurement-unit';
import { QualityIndicator } from '../domain/model/quality-indicator';

export interface QualityAssessmentsResponse extends BaseResponse {
  qualityAssessments: QualityAssessmentResource[];
}

export interface QualityMeasurementResource {
  indicator: QualityIndicator;
  value: number;
  expectedMinimum: number;
  expectedMaximum: number;
}

export interface QualityAssessmentResource extends BaseResource<number> {
  productionRecordId: number;
  measurements: QualityMeasurementResource[];
  assessedAt: string;
}

export interface ProductionRecordReferenceResource {
  id: number;
  batchId: number;
  processName: string;
  processedWeightValue: number;
  processedWeightUnit: MeasurementUnit;
  startedAt: string;
}
