import { BaseEntity } from '../../../shared/domain/model/base-entity';
import { QualityMeasurement } from './quality-measurement';

export class QualityAssessment implements BaseEntity<number> {
  #id: number;
  readonly #productionRecordId: number;
  readonly #measurements: readonly QualityMeasurement[];
  readonly #assessedAt: Date;

  constructor(props: {
    id: number;
    productionRecordId: number;
    measurements: QualityMeasurement[];
    assessedAt: Date;
  }) {
    if (props.measurements.length === 0) {
      throw new Error('At least one quality measurement is required.');
    }
    this.#id = props.id;
    this.#productionRecordId = props.productionRecordId;
    this.#measurements = props.measurements;
    this.#assessedAt = props.assessedAt;
  }

  get id(): number {
    return this.#id;
  }

  set id(value: number) {
    this.#id = value;
  }

  get productionRecordId(): number {
    return this.#productionRecordId;
  }

  get measurements(): readonly QualityMeasurement[] {
    return this.#measurements;
  }

  get assessedAt(): Date {
    return this.#assessedAt;
  }

  measurementValue(indicator: QualityMeasurement['indicator']): number | null {
    return (
      this.#measurements.find((measurement) => measurement.indicator === indicator)?.value.value ??
      null
    );
  }
}
