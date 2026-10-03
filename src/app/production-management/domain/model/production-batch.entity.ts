import { BaseEntity } from '../../../shared/domain/model/base-entity';

export class ProductionBatch implements BaseEntity<number> {
  #id: number;
  #code: string;
  #receptionId: number;
  #registeredAt: Date;

  constructor(props: { id: number; code: string; receptionId: number; registeredAt: Date }) {
    this.#id = props.id;
    this.#code = props.code;
    this.#receptionId = props.receptionId;
    this.#registeredAt = props.registeredAt;
  }

  get id(): number {
    return this.#id;
  }

  set id(value: number) {
    this.#id = value;
  }

  get code(): string {
    return this.#code;
  }

  set code(value: string) {
    this.#code = value;
  }

  get receptionId(): number {
    return this.#receptionId;
  }

  set receptionId(value: number) {
    this.#receptionId = value;
  }

  get registeredAt(): Date {
    return this.#registeredAt;
  }

  set registeredAt(value: Date) {
    this.#registeredAt = value;
  }
}
