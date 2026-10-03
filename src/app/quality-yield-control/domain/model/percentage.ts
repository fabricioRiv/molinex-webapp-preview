export const MINIMUM_PERCENTAGE = 0;
export const MAXIMUM_PERCENTAGE = 100;

export class Percentage {
  readonly #value: number;

  constructor(value: number) {
    if (value < MINIMUM_PERCENTAGE || value > MAXIMUM_PERCENTAGE) {
      throw new Error('Percentage must be between zero and one hundred.');
    }
    this.#value = value;
  }

  get value(): number {
    return this.#value;
  }
}
