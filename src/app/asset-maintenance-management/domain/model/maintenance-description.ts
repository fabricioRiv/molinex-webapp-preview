const MAXIMUM_DESCRIPTION_LENGTH = 500;

export class MaintenanceDescription {
  readonly #value: string;

  constructor(value: string) {
    const normalizedValue = value.trim();
    if (!normalizedValue || normalizedValue.length > MAXIMUM_DESCRIPTION_LENGTH) {
      throw new Error('Maintenance description must contain between 1 and 500 characters.');
    }
    this.#value = normalizedValue;
  }

  get value(): string {
    return this.#value;
  }
}
