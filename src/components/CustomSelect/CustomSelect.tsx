import React from "react";

import clsx from "clsx";

import styles from "./CustomSelect.module.css";

type SelectIntent = "primary" | "secondary";
type SelectVariant = "filled" | "outline";

type SelectOption = {
	value: string;
	label: string;
};

type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> & {
	intent?: SelectIntent;
	variant?: SelectVariant;
	label?: string | React.ReactNode;
	options: SelectOption[];
	onChange?: (value: string) => void;
};

export const CustomSelect = React.forwardRef<HTMLSelectElement, SelectProps>(
	(selectProps, ref) => {
		const {
			intent,
			variant = "filled",
			label,
			options,
			onChange,
			className,
			...props
		} = selectProps;

		const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
			onChange?.(event.target.value);
		};

		return (
			<label className={styles.field}>
				{label && <span className={styles.label}>{label}</span>}
				<select
					ref={ref}
					className={clsx(
						styles.select,
						styles[variant],
						intent && styles[intent],
						className,
					)}
					onChange={handleSelectChange}
					{...props}
				>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</label>
		);
	},
);
