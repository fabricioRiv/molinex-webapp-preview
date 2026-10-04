import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { MaintenanceRecord } from '../domain/model/maintenance-record.entity';
import { MaintenanceRecordAssembler } from './maintenance-record-assembler';
import {
  MaintenanceRecordResource,
  MaintenanceRecordsResponse,
} from './maintenance-records.response';

export class MaintenanceRecordsApiEndpoint extends BaseApiEndpoint<
  MaintenanceRecord,
  MaintenanceRecordResource,
  MaintenanceRecordsResponse,
  MaintenanceRecordAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.apiBaseUrl}${environment.maintenanceRecordsEndpointPath}`,
      new MaintenanceRecordAssembler(),
    );
  }
}
