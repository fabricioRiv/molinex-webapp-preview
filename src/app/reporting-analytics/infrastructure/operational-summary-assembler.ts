import { OperationalSummary } from '../domain/model/operational-summary';
import {
  OperationalSummariesResponse,
  OperationalSummaryResource,
} from './operational-summaries.response';

export class OperationalSummaryAssembler {
  toModelFromResource(resource: OperationalSummaryResource): OperationalSummary {
    return new OperationalSummary({
      activeMachines: resource.activeMachines,
      generatedAt: new Date(resource.generatedAt),
      openAlerts: resource.openAlerts,
      pendingMaintenances: resource.pendingMaintenances,
      period: resource.period,
      processedVolumeKg: resource.processedVolumeKg,
      totalMachines: resource.totalMachines,
      wastePercentage: resource.wastePercentage,
      yieldPercentage: resource.yieldPercentage,
    });
  }

  toModelsFromResponse(response: OperationalSummariesResponse): OperationalSummary[] {
    return response.summaries.map((resource) => this.toModelFromResource(resource));
  }
}
