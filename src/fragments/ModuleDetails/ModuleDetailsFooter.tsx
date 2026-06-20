import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

import { CustomButton } from "@/components";

type ModuleDetailsFooterProps = {
	isEditing: boolean;
	onCancel: () => void;
	onSave: () => void;
	onEdit: () => void;
	onConfirmDelete: () => void;
};

export const ModuleDetailsFooter = ({
	isEditing,
	onCancel,
	onSave,
	onEdit,
	onConfirmDelete,
}: ModuleDetailsFooterProps) => {
	if (isEditing) {
		return (
			<>
				<CustomButton variant="outline" onClick={onCancel}>
					Cancelar
				</CustomButton>
				<CustomButton intent="primary" onClick={onSave}>
					Salvar
				</CustomButton>
			</>
		);
	}

	return (
		<>
			<Popconfirm
				title="Excluir módulo"
				description="Tem certeza que deseja excluir este módulo?"
				onConfirm={onConfirmDelete}
				okText="Sim"
				cancelText="Não"
			>
				<CustomButton intent="danger" variant="outline">
					<DeleteOutlined /> Excluir
				</CustomButton>
			</Popconfirm>
			<CustomButton intent="primary" onClick={onEdit}>
				<EditOutlined /> Editar
			</CustomButton>
		</>
	);
};
