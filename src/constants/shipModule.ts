import type { DamageType, ModifiableShipAttribute, PartCategory, PartFeature, PartRarity, ShipStation } from "@/types";

export const CATEGORY_LABELS: Record<PartCategory, string> = {
	arcane: "Arcano",
	propulsion: "Propulsão",
	weapon: "Arma",
	shield: "Escudo",
	sensor: "Sensor",
	flux: "Fluxo",
	structural: "Estrutural",
	support: "Suporte",
};

export const RARITY_LABELS: Record<PartRarity, string> = {
	common: "Comum",
	uncommon: "Incomum",
	rare: "Raro",
	epic: "Épico",
	legendary: "Lendário",
};

export const STATION_LABELS: Record<ShipStation, string> = {
	helm: "Leme",
	gunner: "Artilheiro",
	navigation: "Navegação",
	mechanical: "Mecânica",
	captain: "Capitão",
	any: "Qualquer",
};

export const DAMAGE_TYPE_LABELS: Record<DamageType, string> = {
	physic: "Físico",
	magic: "Mágico",
};

export const ATTRIBUTE_LABELS: Record<ModifiableShipAttribute, string> = {
	maneuver: "Manobra",
	impulse: "Impulso",
	sensor: "Sensor",
	flux: "Fluxo",
	evasion: "Evasão",
	armorSlots: "Blindagem",
	hp: "HP",
	hpMajor: "HP Major",
	hpSevere: "HP Severe",
	crew: "Tripulação",
	crewRupture: "Ruptura de Tripulação",
	conflict: "Conflito",
	conflictRupture: "Ruptura de Conflito",
	supply: "Suprimento",
	slots: "Slots",
};

export const FEATURE_CATALOG: PartFeature[] = [
	{
		name: "Consumo Arcano",
		description: "Gasta 1 Suprimento por missão longa",
		cost: { supply: 1 },
	},
	{
		name: "Recuo Violento",
		description: "Aplica 1 Stress na nave ao disparar",
		cost: { stress: 1 },
	},
	{
		name: "Dano Contínuo",
		description: "d6 por rodada em alvos em Very Close",
	},
	{
		name: "Absorção Primordial",
		description: "Pode absorver 1 dano Severe uma vez por cena",
	},
	{
		name: "Cortina de Névoa",
		description: "Ação: +2 Evasion até próximo turno",
		cost: { supply: 1 },
	},
	{
		name: "Imobilização",
		description: "Imobiliza nave inimiga por 1 rodada. Difficulty 15, Flux vs Flux",
	},
	{
		name: "Detecção Arcana",
		description: "Detecta magia e naves ocultas",
	},
	{
		name: "Estabilização",
		description: "Reduz degradação de Tripulação em 1 nível após combate",
	},
];
