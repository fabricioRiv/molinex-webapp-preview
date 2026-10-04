export interface ProductionRecordReference {
  id: number;
  batchId: number;
  processName: string;
  processedWeightValue: number;
  processedWeightUnit: 'KILOGRAM' | 'METRIC_TON';
  startedAt: Date;
}
