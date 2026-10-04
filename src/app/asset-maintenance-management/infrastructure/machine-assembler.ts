import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { MachineCode } from '../domain/model/machine-code';
import { Machine } from '../domain/model/machine.entity';
import { MachineResource, MachinesResponse } from './machines.response';

export class MachineAssembler implements BaseAssembler<Machine, MachineResource, MachinesResponse> {
  toEntitiesFromResponse(response: MachinesResponse): Machine[] {
    return response.machines.map((resource) => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: MachineResource): Machine {
    return new Machine({
      id: resource.id,
      code: new MachineCode(resource.code),
      name: resource.name,
      model: resource.model,
      status: resource.status,
      statusChangedAt: new Date(resource.statusChangedAt),
    });
  }

  toResourceFromEntity(entity: Machine): MachineResource {
    return {
      id: entity.id,
      code: entity.code.value,
      name: entity.name,
      model: entity.model,
      status: entity.status,
      statusChangedAt: entity.statusChangedAt.toISOString(),
    };
  }
}
