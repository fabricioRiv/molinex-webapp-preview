import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Percentage } from '../domain/model/percentage';
import { QualityAssessment } from '../domain/model/quality-assessment.entity';
import { QualityMeasurement } from '../domain/model/quality-measurement';
import { QualityRange } from '../domain/model/quality-range';
import {
  QualityAssessmentResource,
  QualityAssessmentsResponse,
} from './quality-assessments.response';

export class QualityAssessmentAssembler implements BaseAssembler<
  QualityAssessment,
  QualityAssessmentResource,
  QualityAssessmentsResponse
> {
  toEntitiesFromResponse(response: QualityAssessmentsResponse): QualityAssessment[] {
    return response.qualityAssessments.map((resource) => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: QualityAssessmentResource): QualityAssessment {
    return new QualityAssessment({
      id: resource.id,
      productionRecordId: resource.productionRecordId,
      measurements: resource.measurements.map(
        (measurement) =>
          new QualityMeasurement(
            measurement.indicator,
            new Percentage(measurement.value),
            new QualityRange(
              new Percentage(measurement.expectedMinimum),
              new Percentage(measurement.expectedMaximum),
            ),
          ),
      ),
      assessedAt: new Date(resource.assessedAt),
    });
  }

  toResourceFromEntity(entity: QualityAssessment): QualityAssessmentResource {
    return {
      id: entity.id,
      productionRecordId: entity.productionRecordId,
      measurements: entity.measurements.map((measurement) => ({
        indicator: measurement.indicator,
        value: measurement.value.value,
        expectedMinimum: measurement.expectedRange.minimum.value,
        expectedMaximum: measurement.expectedRange.maximum.value,
      })),
      assessedAt: entity.assessedAt.toISOString(),
    };
  }
}
