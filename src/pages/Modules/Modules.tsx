import { useAuth } from "@/hooks";

import styles from "./Modules.module.css";

export const Modules = () => {
	useAuth({ authedRoute: true });

	return (
		<main className={styles.page}>
			<h1 className={styles.title}>Módulos</h1>

			<section className={styles.section}>
				<p className={styles.placeholder}>Nenhum módulo cadastrado.</p>
			</section>
		</main>
	);
};
