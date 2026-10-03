import { EntityId } from '../domain/model/base-entity';

export interface BaseResponse {}

export interface BaseResource<TId extends EntityId = EntityId> {
  id: TId;
}
