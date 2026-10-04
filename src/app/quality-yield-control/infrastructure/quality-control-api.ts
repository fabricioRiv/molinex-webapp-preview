import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { ProductionRecordReference } from '../domain/model/production-record-reference';
import { QualityAssessment } from '../domain/model/quality-assessment.entity';
import { WasteRecord } from '../domain/model/waste-record.entity';
import { QualityAssessmentsApiEndpoint } from './quality-assessments-api-endpoint';
import { ProductionRecordReferenceResource } from './quality-assessments.response';
import { WasteRecordsApiEndpoint } from './waste-records-api-endpoint';

@Injectable({ providedIn: 'root' })
export class QualityControlApi extends BaseApi {
  readonly #qualityAssessmentsEndpoint = new QualityAssessmentsApiEndpoint(this.http);
  readonly #wasteRecordsEndpoint = new WasteRecordsApiEndpoint(this.http);

  getQualityAssessments(): Observable<QualityAssessment[]> {
    return this.#qualityAssessmentsEndpoint.getAll();
  }

  createQualityAssessment(assessment: QualityAssessment): Observable<QualityAssessment> {
    return this.#qualityAssessmentsEndpoint.create(assessment);
  }

  getWasteRecords(): Observable<WasteRecord[]> {
    return this.#wasteRecordsEndpoint.getAll();
  }

  createWasteRecord(wasteRecord: WasteRecord): Observable<WasteRecord> {
    return this.#wasteRecordsEndpoint.create(wasteRecord);
  }

  getProductionRecordReferences(): Observable<ProductionRecordReference[]> {
    const endpoint = `${environment.apiBaseUrl}${environment.productionRecordsEndpointPath}`;
    return this.http.get<ProductionRecordReferenceResource[]>(endpoint).pipe(
      map((resources) =>
        resources.map((resource) => ({
          id: resource.id,
          batchId: resource.batchId,
          processName: resource.processName,
          processedWeightValue: resource.processedWeightValue,
          processedWeightUnit: resource.processedWeightUnit,
          startedAt: new Date(resource.startedAt),
        })),
      ),
    );
  }
}
