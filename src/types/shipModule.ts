export type ShipStation = "helm" | "gunner" | "navigation" | "mechanical" | "captain" | "any";

export type DamageType = "physic" | "magic";

export type PartRarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export type PartCategory =
  | "propulsion"
  | "weapon"
  | "shield"
  | "sensor"
  | "arcane"
  | "structural"
  | "support";

export type ShipStatKey = "maneuver" | "impulse" | "sensor" | "flux";

export type ModifiableShipAttribute =
  | ShipStatKey
  | "evasion"
  | "armorSlots"
  | "hp"
  | "hpMajor"
  | "hpSevere"
  | "crew"
  | "crewRupture"
  | "conflict"
  | "conflictRupture"
  | "supply"
  | "slots";

export type AttributeModifier = {
  attribute: ModifiableShipAttribute;
  value: number;
  condition?: string;
};

export type AttributeOverride = {
  attribute: ModifiableShipAttribute;
  value: number;
  reason: string;
};

export type PartDamage = {
  amount: string;
  type: DamageType;
  range?: string;
};

export type PartFeatureCost = {
  supply?: number;
  hope?: number;
  stress?: number;
};

export type PartFeature = {
  name: string;
  description: string;
  cost?: PartFeatureCost;
};

export type ShipModule = {
  id: string;
  name: string;
  category: PartCategory;
  size: number;
  tier: number;
  rarity: PartRarity;
  cost: number;
  station: ShipStation;
  modifiers: AttributeModifier[];
  damage?: PartDamage;
  features: PartFeature[];
  createdAt: Date;
  updatedAt: Date;
};
