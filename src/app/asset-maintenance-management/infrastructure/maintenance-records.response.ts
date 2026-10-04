import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { MaintenanceType } from '../domain/model/maintenance-type';

export interface MaintenanceRecordsResponse extends BaseResponse {
  maintenanceRecords: MaintenanceRecordResource[];
}

export interface MaintenanceRecordResource extends BaseResource<string> {
  machineId: string;
  type: MaintenanceType;
  performedAt: string;
  description: string;
  responsiblePrincipalId: string;
  responsibleDisplayName: string;
  anomalyId: string | null;
}
