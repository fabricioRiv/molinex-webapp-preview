import { BaseEntity } from '../../../shared/domain/model/base-entity';
import { ProductionDetails } from './production-details';

export class ProductionRecord implements BaseEntity<number> {
  #id: number;
  #batchId: number;
  #details: ProductionDetails;
  #recordedAt: Date;

  constructor(props: {
    id: number;
    batchId: number;
    details: ProductionDetails;
    recordedAt: Date;
  }) {
    this.#id = props.id;
    this.#batchId = props.batchId;
    this.#details = props.details;
    this.#recordedAt = props.recordedAt;
  }

  get id(): number {
    return this.#id;
  }

  set id(value: number) {
    this.#id = value;
  }

  get batchId(): number {
    return this.#batchId;
  }

  get details(): ProductionDetails {
    return this.#details;
  }

  get recordedAt(): Date {
    return this.#recordedAt;
  }
}
