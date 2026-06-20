import React from "react";

import { Modal } from "@/components";
import type { ShipModule } from "@/types";

import { ModuleDetailsEdit } from "./ModuleDetailsEdit";
import { ModuleDetailsFooter } from "./ModuleDetailsFooter";
import { ModuleDetailsView } from "./ModuleDetailsView";

type ModuleDetailsProps = {
	shipModule: ShipModule;
	isEditing: boolean;
	isBuilder: boolean;
	onClose: () => void;
	onEdit: () => void;
	onDelete: (moduleId: string) => void;
};

export const ModuleDetails = ({
	shipModule,
	isEditing,
	isBuilder,
	onClose,
	onEdit,
	onDelete,
}: ModuleDetailsProps) => {
	const [editData, setEditData] = React.useState<ShipModule | null>(null);

	React.useEffect(() => {
		if (shipModule && isEditing) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setEditData({ ...shipModule });
		} else {
			setEditData(null);
		}
	}, [shipModule, isEditing]);

	const handleEditField = <K extends keyof ShipModule>(field: K, value: ShipModule[K]) => {
		setEditData((previous) => previous ? { ...previous, [field]: value } : previous);
	};

	const handleSaveModule = () => {
		if (!editData) {
			return;
		}
		console.log("[ModuleDetails] Save module:", editData);
		onClose();
	};

	const handleConfirmDelete = () => {
		onDelete(shipModule.id);
		onClose();
	};

	return (
		<Modal
			isOpen={!!shipModule}
			onClose={onClose}
			title={isEditing ? `Editar: ${shipModule.name}` : shipModule.name}
			footer={isBuilder && (
				<ModuleDetailsFooter
					isEditing={isEditing}
					onCancel={onClose}
					onSave={handleSaveModule}
					onEdit={onEdit}
					onConfirmDelete={handleConfirmDelete}
				/>
			)}
		>
			{isEditing && editData ? (
				<ModuleDetailsEdit
					editData={editData}
					onFieldChange={handleEditField}
				/>
			) : (
				<ModuleDetailsView shipModule={shipModule} />
			)}
		</Modal>
	);
};
