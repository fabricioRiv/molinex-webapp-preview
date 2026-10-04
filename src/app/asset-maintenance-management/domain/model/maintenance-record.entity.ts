import { BaseEntity } from '../../../shared/domain/model/base-entity';
import { MaintenanceDescription } from './maintenance-description';
import { MaintenanceType } from './maintenance-type';
import { TechnicianReference } from './technician-reference';

export class MaintenanceRecord implements BaseEntity<string> {
  #id: string;
  readonly #machineId: string;
  readonly #type: MaintenanceType;
  readonly #performedAt: Date;
  readonly #description: MaintenanceDescription;
  readonly #responsible: TechnicianReference;
  readonly #anomalyId: string | null;

  constructor(props: {
    id: string;
    machineId: string;
    type: MaintenanceType;
    performedAt: Date;
    description: MaintenanceDescription;
    responsible: TechnicianReference;
    anomalyId?: string | null;
  }) {
    if (!props.machineId.trim() || Number.isNaN(props.performedAt.getTime())) {
      throw new Error('A valid machine and maintenance date are required.');
    }
    this.#id = props.id;
    this.#machineId = props.machineId;
    this.#type = props.type;
    this.#performedAt = props.performedAt;
    this.#description = props.description;
    this.#responsible = props.responsible;
    this.#anomalyId = props.anomalyId ?? null;
  }

  get id(): string {
    return this.#id;
  }

  set id(value: string) {
    this.#id = value;
  }

  get machineId(): string {
    return this.#machineId;
  }

  get type(): MaintenanceType {
    return this.#type;
  }

  get performedAt(): Date {
    return this.#performedAt;
  }

  get description(): MaintenanceDescription {
    return this.#description;
  }

  get responsible(): TechnicianReference {
    return this.#responsible;
  }

  get anomalyId(): string | null {
    return this.#anomalyId;
  }
}
