import React from "react";

import clsx from "clsx";

import styles from "./CustomButton.module.css";

type ButtonIntent = "primary" | "secondary" | "link";
type ButtonVariant = "filled" | "outline" | "text";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	intent?: ButtonIntent;
	variant?: ButtonVariant;
};

export const CustomButton = (buttonProps: ButtonProps) => {
	const {
		intent,
		variant = "filled",
		type = "button",
		className,
		children,
		...props
	} = buttonProps;

	return (
		<button
			type={type}
			className={clsx(
				styles.button,
				styles[variant],
				intent && styles[intent],
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
};
