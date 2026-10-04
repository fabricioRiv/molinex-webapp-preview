import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { WasteRecord } from '../domain/model/waste-record.entity';
import { WasteRecordAssembler } from './waste-record-assembler';
import { WasteRecordResource, WasteRecordsResponse } from './waste-records.response';

export class WasteRecordsApiEndpoint extends BaseApiEndpoint<
  WasteRecord,
  WasteRecordResource,
  WasteRecordsResponse,
  WasteRecordAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.apiBaseUrl}${environment.wasteRecordsEndpointPath}`,
      new WasteRecordAssembler(),
    );
  }
}
