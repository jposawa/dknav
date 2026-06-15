import type {
  ShipStatKey,
  ShipModule,
  ModifiableShipAttribute,
  AttributeModifier,
  AttributeOverride,
} from "./shipModule";

export type ShipStatValue = -2 | -1 | 0 | 1 | 2;

export type ShipStats = Record<ShipStatKey, ShipStatValue>;

export type ShipThresholds = {
  major: number;
  severe: number;
};

export type ShipTraitAbility = {
  name: string;
  description: string;
};

export type Ship = {
  id: string;
  name: string;
  templateId: string | null;
  stats: ShipStats;
  evasion: number;
  armorSlots: number;
  hp: number;
  hpThresholds: ShipThresholds;
  crew: number;
  crewRupture: number;
  conflict: number;
  conflictRupture: number;
  supply: number;
  totalSlots: number;
  freeSlots: number;
  installedModules: ShipModule[];
  overrides: AttributeOverride[];
  modifiers: AttributeModifier[];
  activeConditions: AttributeModifier[];
  trait?: ShipTraitAbility;
  createdAt: Date;
  updatedAt: Date;
};

export type EffectiveShipAttributes = Record<ModifiableShipAttribute, number>;
