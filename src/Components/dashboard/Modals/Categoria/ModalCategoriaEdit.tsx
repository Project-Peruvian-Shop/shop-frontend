import { useState, useEffect } from "react";
import styles from "./ModalCategoriaEdit.module.css";
import upload from "../../../../Icons/Modal_producto/upload_icon.svg";
import add_img from "../../../../Icons/Modal_producto/add_img.svg";
import type { ProductoDTO } from "../../../../models/Producto/Producto_response_dto";

interface ModalProductoEditProps {
	producto: ProductoDTO;
	categorias: { id: number; nombre: string }[];
	onClose: () => void;
	onSubmit: (data: {
		nombre: string;
		descripcion: string;
		categoriaID: number;
		imagenFile: File | null;
	}) => void;
}

export default function ModalProductoEdit({
	producto,
	categorias,
	onClose,
	onSubmit,
}: ModalProductoEditProps) {
	const [nombre, setNombre] = useState(producto.nombre);
	const [descripcion, setDescripcion] = useState(producto.descripcion);
	const [categoriaID, setCategoriaID] = useState<number | string>(
		producto.categoriaId
	);
	const [imagenFile, setImagenFile] = useState<File | null>(null);
	const [imagenPreview, setImagenPreview] = useState<string | null>(
		producto.productoEnlace
	);

	useEffect(() => {
		setNombre(producto.nombre);
		setDescripcion(producto.descripcion);
		setCategoriaID(producto.categoriaId);
		setImagenPreview(producto.productoEnlace);
	}, [producto]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit({
			nombre,
			descripcion,
			categoriaID: Number(categoriaID),
			imagenFile,
		});
	};

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modalContent}>
				<form onSubmit={handleSubmit} className={styles.form}>
					<div className={styles.formRow}>
						<div className={styles.imagenSection}>
							<h3>Imagen del producto</h3>
							<div
								className={`${styles.dropZone} ${
									imagenPreview ? styles.dropZoneActive : ""
								}`}
								onDragOver={(e) => e.preventDefault()}
								onDrop={(e) => {
									e.preventDefault();
									const file = e.dataTransfer.files[0];
									if (file) {
										setImagenFile(file);
										setImagenPreview(URL.createObjectURL(file));
									}
								}}
								onClick={() => document.getElementById("editFileInput")?.click()}
							>
								{imagenPreview ? (
									<img
										src={imagenPreview}
										alt="Vista previa"
										className={styles.previewImage}
									/>
								) : (
									<div className={styles.uploadIcon}>
										<img src={add_img} alt="Subir imagen" />
										<p>Agregar Imagen</p>
										<label>JPG, PNG hasta 10MB</label>
									</div>
								)}
							</div>
							<input
								id="editFileInput"
								type="file"
								accept="image/*"
								className={styles.fileInput}
								onChange={(e) => {
									const file = e.target.files?.[0];
									if (file) {
										setImagenFile(file);
										setImagenPreview(URL.createObjectURL(file));
									}
								}}
							/>
							<label htmlFor="editFileInput" className={styles.fileLabel}>
								<img src={upload} alt="Subir imagen" />
								Subir imagen
							</label>
						</div>

						<div className={styles.datosSection}>
							<h3>Editar información</h3>
							<label>
								Nombre
								<input
									type="text"
									value={nombre}
									onChange={(e) => setNombre(e.target.value)}
									required
								/>
							</label>
							<label>
								Categoría
								<select
									value={categoriaID}
									onChange={(e) => setCategoriaID(e.target.value)}
									required
								>
									<option value="">Selecciona una categoría</option>
									{categorias.map((cat) => (
										<option key={cat.id} value={cat.id}>
											{cat.nombre}
										</option>
									))}
								</select>
							</label>
							<label>
								Descripción
								<textarea
									value={descripcion}
									onChange={(e) => setDescripcion(e.target.value)}
									required
								/>
							</label>
							<div className={styles.modalActions}>
								<button type="submit" className={styles.addButton}>
									Guardar
								</button>
								<button
									type="button"
									className={styles.cancelButton}
									onClick={onClose}
								>
									Cancelar
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
