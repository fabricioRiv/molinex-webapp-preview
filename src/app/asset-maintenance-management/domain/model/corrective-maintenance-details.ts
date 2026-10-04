export class CorrectiveMaintenanceDetails {
  readonly #failure: string;
  readonly #cause: string;
  readonly #actionTaken: string;
  readonly #downtimeMinutes: number;

  constructor(props: {
    failure: string;
    cause: string;
    actionTaken: string;
    downtimeMinutes: number;
  }) {
    if (!props.failure.trim() || !props.cause.trim() || !props.actionTaken.trim()) {
      throw new Error('Failure, cause, and corrective action are required.');
    }
    if (!Number.isFinite(props.downtimeMinutes) || props.downtimeMinutes < 0) {
      throw new Error('Downtime must be zero or greater.');
    }
    this.#failure = props.failure.trim();
    this.#cause = props.cause.trim();
    this.#actionTaken = props.actionTaken.trim();
    this.#downtimeMinutes = props.downtimeMinutes;
  }

  get failure(): string {
    return this.#failure;
  }

  get cause(): string {
    return this.#cause;
  }

  get actionTaken(): string {
    return this.#actionTaken;
  }

  get downtimeMinutes(): number {
    return this.#downtimeMinutes;
  }
}
