export type ApiListResponse<T> = {
  data: T[];
  page: number;
  count: number;
  perPage: number;
};

// === Ship Module (peça/módulo de celesnau) ===

export type ApiAttributeModifier = {
  attribute: string;
  value: number;
  condition?: string;
};

export type ApiAttributeOverride = {
  attribute: string;
  value: number;
  reason: string;
};

export type ApiPartDamage = {
  amount: string;
  type: string;
  range?: string;
};

export type ApiPartFeatureCost = {
  supply?: number;
  hope?: number;
  stress?: number;
};

export type ApiPartFeature = {
  name: string;
  description: string;
  cost?: ApiPartFeatureCost;
};

export type ApiShipModule = {
  _id: string;
  name: string;
  category: string;
  size: number;
  tier: number;
  rarity: string;
  cost: number;
  station: string;
  modifiers: ApiAttributeModifier[];
  damage?: ApiPartDamage;
  features: ApiPartFeature[];
  created_at: number;
  updated_at: number;
};

export type ApiShipModuleCreate = Omit<ApiShipModule, "_id" | "created_at" | "updated_at">;

// === Ship (celesnau) ===

export type ApiShipThresholds = {
  major: number;
  severe: number;
};

export type ApiShipTraitAbility = {
  name: string;
  description: string;
};

export type ApiShip = {
  _id: string;
  name: string;
  template_id: string | null;
  stats: Record<string, number>;
  evasion: number;
  armor_slots: number;
  hp: number;
  hp_thresholds: ApiShipThresholds;
  crew: number;
  crew_rupture: number;
  conflict: number;
  conflict_rupture: number;
  supply: number;
  total_slots: number;
  free_slots: number;
  installed_modules: string[];
  overrides: ApiAttributeOverride[];
  modifiers: ApiAttributeModifier[];
  active_conditions: ApiAttributeModifier[];
  trait?: ApiShipTraitAbility;
  created_at: number;
  updated_at: number;
};

export type ApiShipCreate = Omit<ApiShip, "_id" | "created_at" | "updated_at">;
