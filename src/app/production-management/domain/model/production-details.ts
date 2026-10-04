import { Weight } from '../../../production-quality-shared-kernel/domain/model/weight';
import { ProductionStatus } from './production-status';

export class ProductionDetails {
  readonly #processName: string;
  readonly #processedWeight: Weight;
  readonly #startedAt: Date;
  readonly #finishedAt: Date | null;
  readonly #status: ProductionStatus;

  constructor(props: {
    processName: string;
    processedWeight: Weight;
    startedAt: Date;
    finishedAt: Date | null;
    status: ProductionStatus;
  }) {
    const processName = props.processName.trim();
    if (!processName) throw new Error('Process name is required.');
    if (props.finishedAt && props.finishedAt < props.startedAt) {
      throw new Error('Finish time must not precede start time.');
    }

    this.#processName = processName;
    this.#processedWeight = props.processedWeight;
    this.#startedAt = props.startedAt;
    this.#finishedAt = props.finishedAt;
    this.#status = props.status;
  }

  get processName(): string {
    return this.#processName;
  }

  get processedWeight(): Weight {
    return this.#processedWeight;
  }

  get startedAt(): Date {
    return this.#startedAt;
  }

  get finishedAt(): Date | null {
    return this.#finishedAt;
  }

  get status(): ProductionStatus {
    return this.#status;
  }
}
