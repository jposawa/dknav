import React from "react";

import clsx from "clsx";

import styles from "./CustomInput.module.css";

type InputIntent = "primary" | "secondary";
type InputVariant = "filled" | "outline" | "text";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	intent?: InputIntent;
	variant?: InputVariant;
	label?: string | React.ReactNode;
};

export const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(
	(inputProps, ref) => {
		const {
			intent,
			variant = "filled",
			label,
			className,
			...props
		} = inputProps;

		return (
			<label className={styles.field}>
				{label && <span className={styles.label}>{label}</span>}
				<input
					ref={ref}
					className={clsx(
						styles.input,
						styles[variant],
						intent && styles[intent],
						className,
					)}
					{...props}
				/>
			</label>
		);
	},
);
