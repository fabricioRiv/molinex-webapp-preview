import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Machine } from '../domain/model/machine.entity';
import { MachineAssembler } from './machine-assembler';
import { MachineResource, MachinesResponse } from './machines.response';

export class MachinesApiEndpoint extends BaseApiEndpoint<
  Machine,
  MachineResource,
  MachinesResponse,
  MachineAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.apiBaseUrl}${environment.machinesEndpointPath}`,
      new MachineAssembler(),
    );
  }
}
