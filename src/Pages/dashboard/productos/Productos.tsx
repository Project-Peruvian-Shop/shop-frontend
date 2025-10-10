import { useEffect, useState } from "react";
import type { PaginatedResponse } from "../../../services/global.interfaces";
import type { ProductoDashboardDTO, ProductoDTO } from "../../../models/Producto/Producto_response_dto";
import {
	createProducto,
	getAllProductos,
	getProductoById,
	updateProducto,
	getQuantityProductos,
} from "../../../services/producto.service";
import { getAllCategories } from "../../../services/categoria.service";
import DashboardTable, { type Action, type Column } from "../../../Components/table/DashboardTable";
import styles from "./Productos.module.css";
import { useNavigate } from "react-router-dom";
import IconSVG from "../../../Icons/IconSVG";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import type { CategoriaDashboardDTO } from "../../../models/Categoria/Categoria_response";
import { createImagen } from "../../../services/imagen.service";
import ModalProductoCreate from "../../../Components/dashboard/Modals/Producto/ModalProductoCreate";
import ModalProductoEdit from "../../../Components/dashboard/Modals/Producto/ModalProductoEdit";

export default function ProductosTable() {
	const [productos, setProductos] = useState<ProductoDashboardDTO[]>([]);
	const [cantidad, setCantidad] = useState<number>(0);
	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	const navigate = useNavigate();

	// Categorías
	const [categorias, setCategorias] = useState<CategoriaDashboardDTO[]>([]);

	// Control de modales
	const [showModal, setShowModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);

	const [productoSeleccionado, setProductoSeleccionado] = useState<ProductoDTO | null>(null);

	const MySwal = withReactContent(Swal);

	useEffect(() => {
		loadProductos(page);
		loadCategorias();
		loadCantidadProductos();
	}, [page]);

	const loadProductos = async (page: number) => {
		try {
			const res: PaginatedResponse<ProductoDashboardDTO> = await getAllProductos(page, 10);
			setProductos(res.content);
			setTotalPages(res.totalPages);
		} catch (error) {
			console.error("Error cargando productos:", error);
		}
	};

	const loadCategorias = async () => {
		try {
			const res = await getAllCategories(0, 20);
			setCategorias(res.content);
		} catch (error) {
			console.error("Error al cargar categorías:", error);
		}
	};

	const loadCantidadProductos = async () => {
		try {
			const cantidadProductos = await getQuantityProductos();
			setCantidad(cantidadProductos);
		} catch (error) {
			console.error("Error cargando cantidad de productos:", error);
		}
	};

	const uploadImagen = async (file: File | null, defaultID = 2): Promise<number> => {
		if (!file) return productoSeleccionado?.imagenId ?? defaultID;

		const enlace = URL.createObjectURL(file);
		const imagenData = {
			enlace,
			nombre: file.name,
			alt: file.name.replace(/\s+/g, "-"),
		};

		const imagenResponse = await createImagen(imagenData);
		return imagenResponse.id;
	};

	interface ProductoFormData {
		nombre: string;
		descripcion: string;
		categoriaID: number;
		imagenFile: File | null;
	}

	const handleAddProduct = async (data: ProductoFormData) => {
		try {
			const imagenID = await uploadImagen(data.imagenFile);
			const body = {
				nombre: data.nombre,
				descripcion: data.descripcion,
				categoriaID: data.categoriaID,
				imagenID: imagenID,
			};

			const response = await createProducto(body);
			if (response) {
				MySwal.fire({
					icon: "success",
					title: "¡Producto creado!",
					text: "El producto ha sido creado exitosamente.",
				});
				loadProductos(page);
				loadCantidadProductos();
				setShowModal(false);
			}
		} catch (error: unknown) {
			const mensaje = error instanceof Error ? error.message : String(error);
			MySwal.fire({
				icon: "error",
				title: "Error al crear el producto",
				text: mensaje,
			});
		}
	};

	const handleEditProduct = async (data: ProductoFormData) => {
		if (!productoSeleccionado) return;

		// Verificación si hay cambios
		if (
			data.nombre === productoSeleccionado.nombre &&
			data.descripcion === productoSeleccionado.descripcion &&
			data.categoriaID === productoSeleccionado.categoriaId &&
			data.imagenFile === null
		) {
			MySwal.fire({
				icon: "info",
				title: "Sin cambios",
				text: "No has realizado ninguna modificación.",
			});
			return;
		}

		try {
			const imagenID = await uploadImagen(data.imagenFile);
			const body = {
				nombre: data.nombre,
				descripcion: data.descripcion,
				categoriaID: data.categoriaID,
				imagenID,
			};

			const response = await updateProducto(productoSeleccionado.id, body);
			if (response) {
				MySwal.fire({
					icon: "success",
					title: "¡Producto actualizado!",
					text: "El producto ha sido modificado exitosamente.",
				});
				loadProductos(page);
				setShowEditModal(false);
			}
		} catch (error: unknown) {
			const mensaje = error instanceof Error ? error.message : String(error);
			MySwal.fire({
				icon: "error",
				title: "Error al actualizar el producto",
				text: mensaje,
			});
		}
	};

	// Definición de columnas
	const columns: Column<ProductoDashboardDTO>[] = [
		{
			header: "Nombre",
			accessor: "nombre",
			render: (_, row) => (
				<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
					<img
						src={row.imagenEnlace}
						alt={row.imagenAlt}
						style={{
							width: "40px",
							objectFit: "cover",
							height: "40px",
							borderRadius: "4px",
						}}
					/>
					<span>{row.nombre}</span>
				</div>
			),
		},
		{ header: "Categoría", accessor: "categoriaNombre" },
		{ header: "Descripción", accessor: "descripcion" },
	];

	const actions: Action<ProductoDashboardDTO>[] = [
		{
			label: "Ver",
			icon: <IconSVG name="view-secondary" size={20} />,
			onClick: (row) => {
				navigate(`/dashboard/product/${row.id}`);
			},
		},
		{
			label: "Editar",
			icon: <IconSVG name="edit-secondary" size={20} />,
			onClick: async (row) => {
				const producto = await getProductoById(row.id);
				setProductoSeleccionado(producto);
				setShowEditModal(true);
			},
		},
		{
			label: "Eliminar",
			icon: <IconSVG name="delete-secondary" size={20} />,
			onClick: (row) => console.log("Eliminar producto", row),
		},
	];

	return (
		<div>
			<div className={styles.dashboardHeader}>
				<div className={styles.title}>Productos</div>
				<div className={styles.headerActions}>
					<div className={styles.totalProducts}>
						Total: {cantidad} Productos
					</div>
					<button className={styles.addButton} onClick={() => setShowModal(true)}>
						+ Añadir Producto
					</button>
				</div>
			</div>

			<div className={styles.tableContainer}>
				<DashboardTable
					columns={columns}
					data={productos}
					actions={actions}
					currentPage={page}
					totalPages={totalPages}
					onPageChange={setPage}
				/>
			</div>

			{showModal && (
				<ModalProductoCreate
					categorias={categorias}
					onClose={() => setShowModal(false)}
					onSubmit={handleAddProduct}
				/>
			)}

			{showEditModal && productoSeleccionado && (
				<ModalProductoEdit
					producto={productoSeleccionado}
					categorias={categorias}
					onClose={() => setShowEditModal(false)}
					onSubmit={handleEditProduct}
				/>
			)}
		</div>
	);
}
