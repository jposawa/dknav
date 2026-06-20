import {
	ATTRIBUTE_LABELS,
	CATEGORY_LABELS,
	DAMAGE_TYPE_LABELS,
	RARITY_LABELS,
	STATION_LABELS,
} from "@/constants";
import type { ShipModule } from "@/types";

import styles from "./ModuleDetails.module.css";

type ModuleDetailsViewProps = {
	shipModule: ShipModule;
};

export const ModuleDetailsView = ({ shipModule }: ModuleDetailsViewProps) => {
	const modifiers = shipModule.modifiers ?? [];
	const features = shipModule.features ?? [];

	return (
		<>
			<dl className={styles.fields}>
				<div className={styles.field}>
					<dt>Categoria</dt>
					<dd>{CATEGORY_LABELS[shipModule.category]}</dd>
				</div>
				<div className={styles.field}>
					<dt>Raridade</dt>
					<dd>{RARITY_LABELS[shipModule.rarity]}</dd>
				</div>
				<div className={styles.field}>
					<dt>Estação</dt>
					<dd>{STATION_LABELS[shipModule.station]}</dd>
				</div>
				<div className={styles.field}>
					<dt>Tier</dt>
					<dd>{shipModule.tier}</dd>
				</div>
				<div className={styles.field}>
					<dt>Tamanho</dt>
					<dd>{shipModule.size}</dd>
				</div>
				<div className={styles.field}>
					<dt>Custo</dt>
					<dd>{shipModule.cost}</dd>
				</div>
			</dl>

			{modifiers.length > 0 && (
				<section className={styles.section}>
					<h3 className={styles.sectionTitle}>Modificadores</h3>
					<ul className={styles.modifierList}>
						{modifiers.map((modifier, index) => (
							<li key={`${modifier.attribute}-${index}`} className={styles.modifierItem}>
								<span className={styles.modifierAttribute}>
									{ATTRIBUTE_LABELS[modifier.attribute]}
								</span>
								<span className={modifier.value > 0 ? styles.positiveValue : styles.negativeValue}>
									{modifier.value > 0 ? `+${modifier.value}` : modifier.value}
								</span>
								{modifier.condition && (
									<span className={styles.modifierCondition}>{modifier.condition}</span>
								)}
							</li>
						))}
					</ul>
				</section>
			)}

			{shipModule.damage && (
				<section className={styles.section}>
					<h3 className={styles.sectionTitle}>Dano</h3>
					<p className={styles.damageRow}>
						<span className={styles.damageAmount}>{shipModule.damage.amount}</span>
						<span className={styles.damageType}>
							{DAMAGE_TYPE_LABELS[shipModule.damage.type]}
						</span>
						{shipModule.damage.range && (
							<span className={styles.damageRange}>{shipModule.damage.range}</span>
						)}
					</p>
				</section>
			)}

			{features.length > 0 && (
				<section className={styles.section}>
					<h3 className={styles.sectionTitle}>Habilidades</h3>
					{features.map((feature) => (
						<article key={feature.name} className={styles.feature}>
							<h4 className={styles.featureName}>{feature.name}</h4>
							<p className={styles.featureDescription}>{feature.description}</p>
							{feature.cost && (
								<ul className={styles.featureCosts}>
									{feature.cost.supply && (
										<li className={styles.costTag}>Suprimento: {feature.cost.supply}</li>
									)}
									{feature.cost.hope && (
										<li className={styles.costTag}>Esperança: {feature.cost.hope}</li>
									)}
									{feature.cost.stress && (
										<li className={styles.costTag}>Stress: {feature.cost.stress}</li>
									)}
								</ul>
							)}
						</article>
					))}
				</section>
			)}
		</>
	);
};
