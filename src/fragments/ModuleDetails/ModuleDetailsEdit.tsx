import { Select } from "antd";

import { CustomInput, CustomSelect } from "@/components";
import {
	CATEGORY_LABELS,
	FEATURE_CATALOG,
	RARITY_LABELS,
	STATION_LABELS,
} from "@/constants";
import type { PartCategory, PartFeature, PartRarity, ShipModule, ShipStation } from "@/types";

import styles from "./ModuleDetails.module.css";

type ModuleDetailsEditProps = {
	editData: ShipModule;
	onFieldChange: <K extends keyof ShipModule>(field: K, value: ShipModule[K]) => void;
};

const categoryOptions = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({ value, label }));
const rarityOptions = Object.entries(RARITY_LABELS).map(([value, label]) => ({ value, label }));
const stationOptions = Object.entries(STATION_LABELS).map(([value, label]) => ({ value, label }));
const featureOptions = FEATURE_CATALOG.map((feature) => ({ value: feature.name, label: feature.name }));

export const ModuleDetailsEdit = ({ editData, onFieldChange }: ModuleDetailsEditProps) => (
	<>
		<CustomInput
			label="Nome"
			value={editData.name}
			onChange={(event) => onFieldChange("name", event.target.value)}
		/>

		<dl className={styles.fields}>
			<div className={styles.field}>
				<dt>Categoria</dt>
				<dd>
					<CustomSelect
						value={editData.category}
						options={categoryOptions}
						onChange={(value) => onFieldChange("category", value as PartCategory)}
					/>
				</dd>
			</div>
			<div className={styles.field}>
				<dt>Raridade</dt>
				<dd>
					<CustomSelect
						value={editData.rarity}
						options={rarityOptions}
						onChange={(value) => onFieldChange("rarity", value as PartRarity)}
					/>
				</dd>
			</div>
			<div className={styles.field}>
				<dt>Estação</dt>
				<dd>
					<CustomSelect
						value={editData.station}
						options={stationOptions}
						onChange={(value) => onFieldChange("station", value as ShipStation)}
					/>
				</dd>
			</div>
			<div className={styles.field}>
				<dt>Tier</dt>
				<dd>
					<CustomInput
						type="number"
						min={1}
						value={editData.tier}
						onChange={(event) => onFieldChange("tier", Number(event.target.value) || 1)}
					/>
				</dd>
			</div>
			<div className={styles.field}>
				<dt>Tamanho</dt>
				<dd>
					<CustomInput
						type="number"
						min={1}
						value={editData.size}
						onChange={(event) => onFieldChange("size", Number(event.target.value) || 1)}
					/>
				</dd>
			</div>
			<div className={styles.field}>
				<dt>Custo</dt>
				<dd>
					<CustomInput
						type="number"
						min={0}
						value={editData.cost}
						onChange={(event) => onFieldChange("cost", Number(event.target.value) || 0)}
					/>
				</dd>
			</div>
		</dl>

		<section className={styles.section}>
			<h3 className={styles.sectionTitle}>Habilidades</h3>
			<Select
				mode="multiple"
				size="small"
				className={styles.featureSelect}
				placeholder="Selecionar habilidades"
				value={editData.features?.map((feature) => feature.name) ?? []}
				options={featureOptions}
				onChange={(selectedNames: string[]) => {
					const selectedFeatures: PartFeature[] = selectedNames
						.map((name) => FEATURE_CATALOG.find((feature) => feature.name === name))
						.filter((feature): feature is PartFeature => !!feature);
					onFieldChange("features", selectedFeatures);
				}}
			/>
		</section>
	</>
);
