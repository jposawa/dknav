import { useState } from "react";

import { useAtom } from "jotai";

import { CustomButton, CustomInput } from "@/components";
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
					<CustomInput
						label="Nome"
						value={displayName}
						placeholder="Seu nome"
						onChange={(event) => setDisplayName(event.target.value)}
					/>

					<CustomButton
						type="submit"
						intent="primary"
						className={styles.saveButton}
						disabled={isSaving}
					>
						{isSaving ? "Salvando..." : "Salvar"}
					</CustomButton>
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
							<CustomButton
								variant="outline"
								onClick={() => setIsConfirmingLogout(false)}
							>
								Cancelar
							</CustomButton>
							<CustomButton
								intent="danger"
								onClick={logout}
							>
								Sair
							</CustomButton>
						</div>
					</div>
				) : (
					<CustomButton
						intent="danger"
						variant="outline"
						className={styles.logoutButton}
						onClick={() => setIsConfirmingLogout(true)}
					>
						Sair da conta
					</CustomButton>
				)}
			</section>
		</main>
	);
};
