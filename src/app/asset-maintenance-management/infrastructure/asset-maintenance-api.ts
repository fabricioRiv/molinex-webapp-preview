import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Machine } from '../domain/model/machine.entity';
import { MachinesApiEndpoint } from './machines-api-endpoint';

@Injectable({ providedIn: 'root' })
export class AssetMaintenanceApi extends BaseApi {
  readonly #machinesEndpoint = new MachinesApiEndpoint(this.http);

  getMachines(): Observable<Machine[]> {
    return this.#machinesEndpoint.getAll();
  }

  createMachine(machine: Machine): Observable<Machine> {
    return this.#machinesEndpoint.create(machine);
  }
}
