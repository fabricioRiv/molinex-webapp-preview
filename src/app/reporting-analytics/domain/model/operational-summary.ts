export class OperationalSummary {
  readonly activeMachines: number;
  readonly generatedAt: Date;
  readonly openAlerts: number;
  readonly pendingMaintenances: number;
  readonly period: string;
  readonly processedVolumeKg: number;
  readonly totalMachines: number;
  readonly wastePercentage: number;
  readonly yieldPercentage: number;

  constructor(props: {
    activeMachines: number;
    generatedAt: Date;
    openAlerts: number;
    pendingMaintenances: number;
    period: string;
    processedVolumeKg: number;
    totalMachines: number;
    wastePercentage: number;
    yieldPercentage: number;
  }) {
    this.activeMachines = props.activeMachines;
    this.generatedAt = props.generatedAt;
    this.openAlerts = props.openAlerts;
    this.pendingMaintenances = props.pendingMaintenances;
    this.period = props.period;
    this.processedVolumeKg = props.processedVolumeKg;
    this.totalMachines = props.totalMachines;
    this.wastePercentage = props.wastePercentage;
    this.yieldPercentage = props.yieldPercentage;
  }
}
