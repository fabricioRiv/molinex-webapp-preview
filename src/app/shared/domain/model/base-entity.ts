export type EntityId = string | number;

export interface BaseEntity<TId extends EntityId = EntityId> {
  id: TId;
}
