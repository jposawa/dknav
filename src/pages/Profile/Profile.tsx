import { useState } from "react";

import { useAtom } from "jotai";

import { STORAGE_KEY } from "@/constants";
import { saveStorage } from "@/helpers";
import { useAuth, useDatabase } from "@/hooks";
import { currentUserAtom } from "@/states";

import styles from "./Profile.module.css";

export const Profile = () => {
	const { logout } = useAuth({ authedRoute: true });
	const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
	const { saveData } = useDatabase();
	const [isConfirmingLogout, setIsConfirmingLogout] = useState(false);
	const [displayName, setDisplayName] = useState(
		currentUser?.displayName ?? currentUser?.fullName ?? "",
	);
	const [isSaving, setIsSaving] = useState(false);

	const handleDisplayNameFormSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (!currentUser || isSaving) {
			return;
		}

		setIsSaving(true);

		try {
			await saveData(`users/${currentUser.id}`, { displayName });
			const updatedUser = { ...currentUser, displayName };
			setCurrentUser(updatedUser);
			saveStorage(STORAGE_KEY.USER, updatedUser, {
				needParse: true,
				isPersistent: true,
			});
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<main className={styles.page}>
			<h1 className={styles.title}>Perfil</h1>

			<header className={styles.section}>
				<h2 className={styles.sectionTitle}>Dados pessoais</h2>
				<p className={styles.infoRow}>
					<span className={styles.infoLabel}>E-mail</span>
					<span className={styles.infoValue}>
						{currentUser?.email ?? "—"}
					</span>
				</p>
			</header>

			<section className={styles.section}>
				<h2 className={styles.sectionTitle}>Nome de exibição</h2>
				<form
					className={styles.form}
					onSubmit={handleDisplayNameFormSubmit}
				>
					<label className={styles.field}>
						Nome
						<input
							type="text"
							value={displayName}
							placeholder="Seu nome"
							onChange={(event) =>
								setDisplayName(event.target.value)
							}
						/>
					</label>

					<button
						type="submit"
						className={styles.saveButton}
						disabled={isSaving}
					>
						{isSaving ? "Salvando..." : "Salvar"}
					</button>
				</form>
			</section>

			<section className={styles.section}>
				<h2 className={styles.sectionTitle}>Conta</h2>
				{isConfirmingLogout ? (
					<div className={styles.logoutConfirm}>
						<span className={styles.logoutConfirmText}>
							Tem certeza que deseja sair?
						</span>
						<div className={styles.logoutActions}>
							<button
								type="button"
								className={styles.cancelButton}
								onClick={() => setIsConfirmingLogout(false)}
							>
								Cancelar
							</button>
							<button
								type="button"
								className={styles.confirmLogoutButton}
								onClick={logout}
							>
								Sair
							</button>
						</div>
					</div>
				) : (
					<button
						type="button"
						className={styles.logoutButton}
						onClick={() => setIsConfirmingLogout(true)}
					>
						Sair da conta
					</button>
				)}
			</section>
		</main>
	);
};
