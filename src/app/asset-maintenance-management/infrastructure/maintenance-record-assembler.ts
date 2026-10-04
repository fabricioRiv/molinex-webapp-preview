import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { CorrectiveMaintenanceDetails } from '../domain/model/corrective-maintenance-details';
import { MaintenanceDescription } from '../domain/model/maintenance-description';
import { MaintenanceRecord } from '../domain/model/maintenance-record.entity';
import { TechnicianReference } from '../domain/model/technician-reference';
import {
  MaintenanceRecordResource,
  MaintenanceRecordsResponse,
} from './maintenance-records.response';

export class MaintenanceRecordAssembler implements BaseAssembler<
  MaintenanceRecord,
  MaintenanceRecordResource,
  MaintenanceRecordsResponse
> {
  toEntitiesFromResponse(response: MaintenanceRecordsResponse): MaintenanceRecord[] {
    return response.maintenanceRecords.map((resource) => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: MaintenanceRecordResource): MaintenanceRecord {
    return new MaintenanceRecord({
      id: resource.id,
      machineId: resource.machineId,
      type: resource.type,
      performedAt: new Date(resource.performedAt),
      description: new MaintenanceDescription(resource.description),
      responsible: new TechnicianReference(
        resource.responsiblePrincipalId,
        resource.responsibleDisplayName,
      ),
      anomalyId: resource.anomalyId,
      correctiveDetails:
        resource.type === 'CORRECTIVE' &&
        resource.failure !== null &&
        resource.cause !== null &&
        resource.actionTaken !== null &&
        resource.downtimeMinutes !== null
          ? new CorrectiveMaintenanceDetails({
              failure: resource.failure,
              cause: resource.cause,
              actionTaken: resource.actionTaken,
              downtimeMinutes: resource.downtimeMinutes,
            })
          : null,
    });
  }

  toResourceFromEntity(entity: MaintenanceRecord): MaintenanceRecordResource {
    return {
      id: entity.id,
      machineId: entity.machineId,
      type: entity.type,
      performedAt: entity.performedAt.toISOString(),
      description: entity.description.value,
      responsiblePrincipalId: entity.responsible.principalId,
      responsibleDisplayName: entity.responsible.displayName,
      anomalyId: entity.anomalyId,
      failure: entity.correctiveDetails?.failure ?? null,
      cause: entity.correctiveDetails?.cause ?? null,
      actionTaken: entity.correctiveDetails?.actionTaken ?? null,
      downtimeMinutes: entity.correctiveDetails?.downtimeMinutes ?? null,
    };
  }
}
