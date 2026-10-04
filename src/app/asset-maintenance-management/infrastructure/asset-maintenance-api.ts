import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Machine } from '../domain/model/machine.entity';
import { MaintenanceRecord } from '../domain/model/maintenance-record.entity';
import { MaintenanceRecordsApiEndpoint } from './maintenance-records-api-endpoint';
import { MachinesApiEndpoint } from './machines-api-endpoint';

@Injectable({ providedIn: 'root' })
export class AssetMaintenanceApi extends BaseApi {
  readonly #machinesEndpoint = new MachinesApiEndpoint(this.http);
  readonly #maintenanceRecordsEndpoint = new MaintenanceRecordsApiEndpoint(this.http);

  getMachines(): Observable<Machine[]> {
    return this.#machinesEndpoint.getAll();
  }

  createMachine(machine: Machine): Observable<Machine> {
    return this.#machinesEndpoint.create(machine);
  }

  getMaintenanceRecords(): Observable<MaintenanceRecord[]> {
    return this.#maintenanceRecordsEndpoint.getAll();
  }

  createMaintenanceRecord(record: MaintenanceRecord): Observable<MaintenanceRecord> {
    return this.#maintenanceRecordsEndpoint.create(record);
  }
}
