import { Weight } from '../../../production-quality-shared-kernel/domain/model/weight';
import { BaseEntity } from '../../../shared/domain/model/base-entity';

export class RawMaterialReception implements BaseEntity<number> {
  #id: number;
  #receivedAt: Date;
  #supplierName: string;
  #originDescription: string;
  #quantity: Weight;

  constructor(props: {
    id: number;
    receivedAt: Date;
    supplierName: string;
    originDescription: string;
    quantity: Weight;
  }) {
    this.#id = props.id;
    this.#receivedAt = props.receivedAt;
    this.#supplierName = props.supplierName;
    this.#originDescription = props.originDescription;
    this.#quantity = props.quantity;
  }

  get id(): number {
    return this.#id;
  }

  set id(value: number) {
    this.#id = value;
  }

  get receivedAt(): Date {
    return this.#receivedAt;
  }

  set receivedAt(value: Date) {
    this.#receivedAt = value;
  }

  get supplierName(): string {
    return this.#supplierName;
  }

  set supplierName(value: string) {
    this.#supplierName = value;
  }

  get originDescription(): string {
    return this.#originDescription;
  }

  set originDescription(value: string) {
    this.#originDescription = value;
  }

  get quantity(): Weight {
    return this.#quantity;
  }

  set quantity(value: Weight) {
    this.#quantity = value;
  }
}
