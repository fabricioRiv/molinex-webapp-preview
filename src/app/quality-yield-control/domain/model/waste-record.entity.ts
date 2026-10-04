import { MeasurementUnit } from '../../../production-quality-shared-kernel/domain/model/measurement-unit';
import { Weight } from '../../../production-quality-shared-kernel/domain/model/weight';
import { BaseEntity } from '../../../shared/domain/model/base-entity';
import { Percentage } from './percentage';

const KILOGRAMS_PER_METRIC_TON = 1_000;

export class WasteRecord implements BaseEntity<string> {
  #id: string;
  readonly #productionRecordId: number;
  readonly #quantity: Weight;
  readonly #baseWeight: Weight | null;
  readonly #percentage: Percentage | null;
  readonly #recordedAt: Date;

  constructor(props: {
    id: string;
    productionRecordId: number;
    quantity: Weight;
    baseWeight: Weight | null;
    recordedAt: Date;
  }) {
    this.#id = props.id;
    this.#productionRecordId = props.productionRecordId;
    this.#quantity = props.quantity;
    this.#baseWeight = props.baseWeight;
    this.#percentage = this.#calculatePercentage(props.quantity, props.baseWeight);
    this.#recordedAt = props.recordedAt;
  }

  get id(): string {
    return this.#id;
  }

  set id(value: string) {
    this.#id = value;
  }

  get productionRecordId(): number {
    return this.#productionRecordId;
  }

  get quantity(): Weight {
    return this.#quantity;
  }

  get baseWeight(): Weight | null {
    return this.#baseWeight;
  }

  get percentage(): Percentage | null {
    return this.#percentage;
  }

  get recordedAt(): Date {
    return this.#recordedAt;
  }

  quantityInKilograms(): number {
    return this.#toKilograms(this.#quantity.value, this.#quantity.unit);
  }

  #calculatePercentage(quantity: Weight, baseWeight: Weight | null): Percentage | null {
    if (!baseWeight) return null;

    const quantityInKilograms = this.#toKilograms(quantity.value, quantity.unit);
    const baseWeightInKilograms = this.#toKilograms(baseWeight.value, baseWeight.unit);
    return new Percentage((quantityInKilograms / baseWeightInKilograms) * 100);
  }

  #toKilograms(value: number, unit: MeasurementUnit): number {
    return unit === 'METRIC_TON' ? value * KILOGRAMS_PER_METRIC_TON : value;
  }
}
