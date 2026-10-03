import { Percentage } from './percentage';

export class QualityRange {
  readonly #minimum: Percentage;
  readonly #maximum: Percentage;

  constructor(minimum: Percentage, maximum: Percentage) {
    if (minimum.value > maximum.value) {
      throw new Error('Minimum percentage must not exceed maximum percentage.');
    }
    this.#minimum = minimum;
    this.#maximum = maximum;
  }

  get minimum(): Percentage {
    return this.#minimum;
  }

  get maximum(): Percentage {
    return this.#maximum;
  }

  contains(value: Percentage): boolean {
    return value.value >= this.#minimum.value && value.value <= this.#maximum.value;
  }
}
