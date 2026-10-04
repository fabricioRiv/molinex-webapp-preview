const MAXIMUM_MACHINE_CODE_LENGTH = 30;

export class MachineCode {
  readonly #value: string;

  constructor(value: string) {
    const normalizedValue = value.trim().toUpperCase();
    if (!normalizedValue || normalizedValue.length > MAXIMUM_MACHINE_CODE_LENGTH) {
      throw new Error('Machine code must contain between 1 and 30 characters.');
    }
    this.#value = normalizedValue;
  }

  get value(): string {
    return this.#value;
  }
}
