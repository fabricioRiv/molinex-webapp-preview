export class TechnicianReference {
  readonly #principalId: string;
  readonly #displayName: string;

  constructor(principalId: string, displayName: string) {
    if (!principalId.trim() || !displayName.trim()) {
      throw new Error('Technician identification and display name are required.');
    }
    this.#principalId = principalId;
    this.#displayName = displayName.trim();
  }

  get principalId(): string {
    return this.#principalId;
  }

  get displayName(): string {
    return this.#displayName;
  }
}
