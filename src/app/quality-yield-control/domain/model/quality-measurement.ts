import { Percentage } from './percentage';
import { QualityIndicator } from './quality-indicator';
import { QualityRange } from './quality-range';

export class QualityMeasurement {
  readonly #indicator: QualityIndicator;
  readonly #value: Percentage;
  readonly #expectedRange: QualityRange;

  constructor(indicator: QualityIndicator, value: Percentage, expectedRange: QualityRange) {
    this.#indicator = indicator;
    this.#value = value;
    this.#expectedRange = expectedRange;
  }

  get indicator(): QualityIndicator {
    return this.#indicator;
  }

  get value(): Percentage {
    return this.#value;
  }

  get expectedRange(): QualityRange {
    return this.#expectedRange;
  }

  isOutsideExpectedRange(): boolean {
    return !this.#expectedRange.contains(this.#value);
  }
}
