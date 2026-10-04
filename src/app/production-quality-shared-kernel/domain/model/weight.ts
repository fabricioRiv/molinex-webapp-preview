import { MeasurementUnit } from './measurement-unit';

export class Weight {
  readonly #value: number;
  readonly #unit: MeasurementUnit;

  constructor(value: number, unit: MeasurementUnit) {
    if (value <= 0) {
      throw new Error('Weight must be greater than zero.');
    }

    this.#value = value;
    this.#unit = unit;
  }

  get value(): number {
    return this.#value;
  }

  get unit(): MeasurementUnit {
    return this.#unit;
  }
}
