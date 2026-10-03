export interface OperationalSummariesResponse {
  summaries: OperationalSummaryResource[];
}

export interface OperationalSummaryResource {
  id: number;
  activeMachines: number;
  generatedAt: string;
  openAlerts: number;
  pendingMaintenances: number;
  period: string;
  processedVolumeKg: number;
  totalMachines: number;
  wastePercentage: number;
  yieldPercentage: number;
}
