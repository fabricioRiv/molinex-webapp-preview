import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { OperationalSummary } from '../domain/model/operational-summary';
import { OperationalSummariesApiEndpoint } from './operational-summaries-api-endpoint';

@Injectable({ providedIn: 'root' })
export class ReportingAnalyticsApi extends BaseApi {
  readonly #operationalSummariesEndpoint = new OperationalSummariesApiEndpoint(this.http);

  getOperationalSummaries(): Observable<OperationalSummary[]> {
    return this.#operationalSummariesEndpoint.getAll();
  }
}
