import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { ProductionRecordReference } from '../domain/model/production-record-reference';
import { QualityAssessment } from '../domain/model/quality-assessment.entity';
import { QualityAssessmentsApiEndpoint } from './quality-assessments-api-endpoint';
import { ProductionRecordReferenceResource } from './quality-assessments.response';

@Injectable({ providedIn: 'root' })
export class QualityControlApi extends BaseApi {
  readonly #qualityAssessmentsEndpoint = new QualityAssessmentsApiEndpoint(this.http);

  getQualityAssessments(): Observable<QualityAssessment[]> {
    return this.#qualityAssessmentsEndpoint.getAll();
  }

  createQualityAssessment(assessment: QualityAssessment): Observable<QualityAssessment> {
    return this.#qualityAssessmentsEndpoint.create(assessment);
  }

  getProductionRecordReferences(): Observable<ProductionRecordReference[]> {
    const endpoint = `${environment.apiBaseUrl}${environment.productionRecordsEndpointPath}`;
    return this.http.get<ProductionRecordReferenceResource[]>(endpoint).pipe(
      map((resources) =>
        resources.map((resource) => ({
          id: resource.id,
          batchId: resource.batchId,
          processName: resource.processName,
          startedAt: new Date(resource.startedAt),
        })),
      ),
    );
  }
}
