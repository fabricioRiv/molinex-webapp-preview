import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface ProductionBatchesResponse extends BaseResponse {
  productionBatches: ProductionBatchResource[];
}

export interface ProductionBatchResource extends BaseResource<number> {
  code: string;
  receptionId: number;
  registeredAt: string;
}
