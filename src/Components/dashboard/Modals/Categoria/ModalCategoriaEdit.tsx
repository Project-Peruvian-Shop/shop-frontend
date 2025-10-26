import { useState, useEffect } from "react";
import styles from "./ModalCategoriaEdit.module.css";
import upload from "../../../../Icons/Modal_producto/upload_icon.svg";
import add_img from "../../../../Icons/Modal_producto/add_img.svg";
import type { CategoriaDashboardDTO } from "../../../../models/Categoria/Categoria_response";

interface ModalCategoriaEditProps {
	categoria: CategoriaDashboardDTO;
	onClose: () => void;
	onSubmit: (data: {
		nombre: string;
		norma: string;
		usos: string;
		imagenFile: File | null;
	}) => void;
}

export default function ModalCategoriaEdit({
	categoria,
	onClose,
	onSubmit,
}: ModalCategoriaEditProps) {
	const [nombre, setNombre] = useState(categoria.nombre);
	const [norma, setNorma] = useState(categoria.norma);
	const [usos, setUsos] = useState(categoria.usos);
	const [imagenFile, setImagenFile] = useState<File | null>(null);
	const [imagenPreview, setImagenPreview] = useState<string | null>(
		categoria.imagenEnlace
	);

	useEffect(() => {
		setNombre(categoria.nombre);
		setNorma(categoria.norma);
		setUsos(categoria.usos);
		setImagenPreview(categoria.imagenEnlace);
	}, [categoria]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit({
			nombre,
			norma,
			usos,
			imagenFile,
		});
	};

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modalContent}>
				<form onSubmit={handleSubmit} className={styles.form}>
					<div className={styles.formRow}>
						<div className={styles.imagenSection}>
							<h3>Imagen de la Línea</h3>
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
								Norma
								<input
									type="text"
									value={norma}
									onChange={(e) => setNorma(e.target.value)}
									required
								/>
							</label>
							<label>
								Usos
								<textarea
									value={usos}
									onChange={(e) => setUsos(e.target.value)}
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
