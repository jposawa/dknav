import React from "react";

import clsx from "clsx";

import styles from "./Modal.module.css";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
	footer?: React.ReactNode;
	className?: string;
};

export const Modal = ({ isOpen, onClose, title, children, footer, className }: ModalProps) => {
	React.useEffect(() => {
		if (!isOpen) return;

		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose();
		};

		document.addEventListener("keydown", handleEscapeKey);
		return () => document.removeEventListener("keydown", handleEscapeKey);
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className={styles.overlay} onClick={onClose}>
			<div
				className={clsx(styles.modal, className)}
				onClick={(event) => event.stopPropagation()}
				role="dialog"
				aria-modal="true"
				aria-label={title}
			>
				<header className={styles.header}>
					{title && <h2 className={styles.title}>{title}</h2>}
					<button
						type="button"
						className={styles.closeButton}
						onClick={onClose}
						aria-label="Fechar"
					>
						✕
					</button>
				</header>

				<div className={styles.content}>{children}</div>

				{footer && <footer className={styles.footer}>{footer}</footer>}
			</div>
		</div>
	);
};
