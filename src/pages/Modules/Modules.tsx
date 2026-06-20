import React from "react";

import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Popconfirm, Table } from "antd";

import { CustomButton } from "@/components";
import { useAuth, useConfig } from "@/hooks";
import { deleteModule, fetchModules } from "@/services";
import type { ShipModule } from "@/types";
import { CATEGORY_LABELS, RARITY_LABELS, STATION_LABELS } from "@/constants";
import { ModuleDetails } from "@/fragments";

import styles from "./Modules.module.css";

export const Modules = () => {
	const { currentUser } = useAuth({ authedRoute: true });
	const { config } = useConfig();

	const [modules, setModules] = React.useState<ShipModule[]>([]);
	const [isLoadingModules, setIsLoadingModules] = React.useState(true);
	const [selectedModule, setSelectedModule] = React.useState<ShipModule | null>(
		null,
	);
	const [isEditingModule, setIsEditingModule] = React.useState(false);

	const isBuilder = Boolean(
		currentUser?.id && config?.builderUsers?.includes(currentUser.id),
	);

	React.useEffect(() => {
		let cancelled = false;

		const loadModules = async () => {
			try {
				const fetchedModules = await fetchModules();
				if (!cancelled) setModules(fetchedModules);
			} catch (error) {
				console.error("[Modules] Error fetching modules:", error);
			} finally {
				if (!cancelled) setIsLoadingModules(false);
			}
		};

		loadModules();

		return () => {
			cancelled = true;
		};
	}, []);

	const handleDeleteModule = async (moduleId: string) => {
		try {
			await deleteModule(moduleId);
			setModules((previous) =>
				previous.filter((shipModule) => shipModule.id !== moduleId),
			);
		} catch (error) {
			console.error("[Modules] Error deleting module:", error);
		}
	};

	const handleCloseModal = () => {
		setSelectedModule(null);
		setIsEditingModule(false);
	};

	const handleOpenEditModule = (record: ShipModule) => {
		setSelectedModule(record);
		setIsEditingModule(true);
	};

	const columns = [
		{
			title: "Nome",
			dataIndex: "name",
			key: "name",
			sorter: (a: ShipModule, b: ShipModule) => a.name.localeCompare(b.name),
			showSorterTooltip: false,
		},
		{
			title: "Categoria",
			dataIndex: "category",
			key: "category",
			sorter: (a: ShipModule, b: ShipModule) =>
				a.category.localeCompare(b.category),
			showSorterTooltip: false,
			render: (category: ShipModule["category"]) => CATEGORY_LABELS[category],
		},
		{
			title: "Tier",
			dataIndex: "tier",
			key: "tier",
			sorter: (a: ShipModule, b: ShipModule) => a.tier - b.tier,
			showSorterTooltip: false,
		},
		{
			title: "Raridade",
			dataIndex: "rarity",
			key: "rarity",
			sorter: (a: ShipModule, b: ShipModule) =>
				a.rarity.localeCompare(b.rarity),
			showSorterTooltip: false,
			render: (rarity: ShipModule["rarity"]) => RARITY_LABELS[rarity],
		},
		{
			title: "Estação",
			dataIndex: "station",
			key: "station",
			sorter: (a: ShipModule, b: ShipModule) =>
				a.station.localeCompare(b.station),
			showSorterTooltip: false,
			render: (station: ShipModule["station"]) => STATION_LABELS[station],
		},
		{
			title: "Tamanho",
			dataIndex: "size",
			key: "size",
			sorter: (a: ShipModule, b: ShipModule) => a.size - b.size,
			showSorterTooltip: false,
		},
		{
			title: "Custo",
			dataIndex: "cost",
			key: "cost",
			sorter: (a: ShipModule, b: ShipModule) => a.cost - b.cost,
			showSorterTooltip: false,
		},
		...(isBuilder
			? [
					{
						title: "",
						key: "actions",
						render: (_: unknown, record: ShipModule) => (
							<span
								className={styles.actions}
								onClick={(event) => event.stopPropagation()}
							>
								<CustomButton
									variant="text"
									intent="primary"
									className={styles.editButton}
									onClick={() => handleOpenEditModule(record)}
								>
									<EditOutlined />
								</CustomButton>
								<Popconfirm
									title="Excluir módulo"
									description="Tem certeza que deseja excluir este módulo?"
									onConfirm={() => handleDeleteModule(record.id)}
									okText="Sim"
									cancelText="Não"
								>
									<CustomButton variant="text" intent="danger">
										<DeleteOutlined />
									</CustomButton>
								</Popconfirm>
							</span>
						),
					},
				]
			: []),
	];

	return (
		<main className={styles.page}>
			<header className={styles.header}>
				<h1 className={styles.title}>Módulos</h1>

				{isBuilder && (
					<CustomButton
						intent="primary"
						onClick={() => console.log("[Modules] Create module")}
					>
						<PlusOutlined /> Novo módulo
					</CustomButton>
				)}
			</header>

			<section className={styles.section}>
				<Table
					className={styles.table}
					columns={columns}
					dataSource={modules}
					rowKey="id"
					loading={isLoadingModules}
					locale={{ emptyText: "Nenhum módulo cadastrado." }}
					pagination={{ pageSize: 20, size: "small" }}
					size="small"
					scroll={{ x: "max-content" }}
					onRow={(record) => ({
						onClick: () => setSelectedModule(record),
						style: { cursor: "pointer" },
					})}
				/>
			</section>

			{selectedModule && (
				<ModuleDetails
					shipModule={selectedModule}
					isEditing={isEditingModule}
					isBuilder={isBuilder}
					onClose={handleCloseModal}
					onEdit={() => setIsEditingModule(true)}
					onDelete={handleDeleteModule}
				/>
			)}
		</main>
	);
};
