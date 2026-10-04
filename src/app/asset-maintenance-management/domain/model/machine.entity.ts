import { BaseEntity } from '../../../shared/domain/model/base-entity';
import { MachineCode } from './machine-code';
import { MachineStatus } from './machine-status';

export class Machine implements BaseEntity<string> {
  #id: string;
  readonly #code: MachineCode;
  readonly #name: string;
  readonly #model: string;
  readonly #status: MachineStatus;
  readonly #statusChangedAt: Date;

  constructor(props: {
    id: string;
    code: MachineCode;
    name: string;
    model: string;
    status: MachineStatus;
    statusChangedAt: Date;
  }) {
    if (!props.name.trim() || !props.model.trim()) {
      throw new Error('Machine name and model are required.');
    }
    this.#id = props.id;
    this.#code = props.code;
    this.#name = props.name.trim();
    this.#model = props.model.trim();
    this.#status = props.status;
    this.#statusChangedAt = props.statusChangedAt;
  }

  get id(): string {
    return this.#id;
  }

  set id(value: string) {
    this.#id = value;
  }

  get code(): MachineCode {
    return this.#code;
  }

  get name(): string {
    return this.#name;
  }

  get model(): string {
    return this.#model;
  }

  get status(): MachineStatus {
    return this.#status;
  }

  get statusChangedAt(): Date {
    return this.#statusChangedAt;
  }
}
