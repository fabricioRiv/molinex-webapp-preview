import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { ProductionRecord } from '../domain/model/production-record.entity';
import { ProductionRecordAssembler } from './production-record-assembler';
import { ProductionRecordResource, ProductionRecordsResponse } from './production-records.response';

export class ProductionRecordsApiEndpoint extends BaseApiEndpoint<
  ProductionRecord,
  ProductionRecordResource,
  ProductionRecordsResponse,
  ProductionRecordAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.apiBaseUrl}${environment.productionRecordsEndpointPath}`,
      new ProductionRecordAssembler(),
    );
  }
}
