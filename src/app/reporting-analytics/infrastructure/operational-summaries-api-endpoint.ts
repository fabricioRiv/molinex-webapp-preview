import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ErrorHandlingEnabledBaseType } from '../../shared/infrastructure/error-handling-enabled-base-type';
import { OperationalSummary } from '../domain/model/operational-summary';
import {
  OperationalSummariesResponse,
  OperationalSummaryResource,
} from './operational-summaries.response';
import { OperationalSummaryAssembler } from './operational-summary-assembler';

export class OperationalSummariesApiEndpoint extends ErrorHandlingEnabledBaseType {
  readonly #assembler = new OperationalSummaryAssembler();
  readonly #endpointUrl = `${environment.apiBaseUrl}${environment.reportSummariesEndpointPath}`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  getAll(): Observable<OperationalSummary[]> {
    return this.http
      .get<OperationalSummariesResponse | OperationalSummaryResource[]>(this.#endpointUrl)
      .pipe(
        map((response) => {
          if (Array.isArray(response)) {
            return response.map((resource) => this.#assembler.toModelFromResource(resource));
          }

          return this.#assembler.toModelsFromResponse(response);
        }),
        catchError(this.handleError('Failed to fetch operational summaries')),
      );
  }
}
