import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { QualityAssessment } from '../domain/model/quality-assessment.entity';
import { QualityAssessmentAssembler } from './quality-assessment-assembler';
import {
  QualityAssessmentResource,
  QualityAssessmentsResponse,
} from './quality-assessments.response';

export class QualityAssessmentsApiEndpoint extends BaseApiEndpoint<
  QualityAssessment,
  QualityAssessmentResource,
  QualityAssessmentsResponse,
  QualityAssessmentAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.apiBaseUrl}${environment.qualityResultsEndpointPath}`,
      new QualityAssessmentAssembler(),
    );
  }
}
