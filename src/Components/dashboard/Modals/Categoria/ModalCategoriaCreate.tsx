import { useState } from "react";
import styles from "./ModalCategoriaCreate.module.css";
import add_img from "../../../../Icons/Modal_producto/add_img.svg";
import upload from "../../../../Icons/Modal_producto/upload_icon.svg";

interface ModalCategoriaCreateProps {
	onClose: () => void;
	onSubmit: (data: {
		nombre: string;
		norma: string;
		usos: string;
		imagenFile: File | null;
	}) => Promise<void>;
}

export default function ModalCategoriaCreate({  onClose, onSubmit }: ModalCategoriaCreateProps) {
	const [nombre, setNombre] = useState("");
	const [norma, setNorma] = useState("");
	const [usos, setUsos] = useState("");
	const [imagenFile, setImagenFile] = useState<File | null>(null);
	const [imagenPreview, setImagenPreview] = useState<string | null>(null);

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
								className={`${styles.dropZone} ${imagenPreview ? styles.dropZoneActive : ""}`}
								onDragOver={(e) => e.preventDefault()}
								onDrop={(e) => {
									e.preventDefault();
									const file = e.dataTransfer.files[0];
									if (file) {
										setImagenFile(file);
										setImagenPreview(URL.createObjectURL(file));
									}
								}}
								onClick={() => document.getElementById("fileInputCreate")?.click()}
							>
								{imagenPreview ? (
									<img src={imagenPreview} alt="Vista previa" className={styles.previewImage} />
								) : (
									<div className={styles.uploadIcon}>
										<img src={add_img} alt="Subir imagen" />
										<p>Agregar Imagen</p>
										<label>JPG, PNG hasta 10MB</label>
									</div>
								)}
							</div>
							<input
								id="fileInputCreate"
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
							<label htmlFor="fileInputCreate" className={styles.fileLabel}>
								<img src={upload} alt="Subir imagen" /> Subir imagen
							</label>
						</div>

						<div className={styles.datosSection}>
							<h3>Información de la Línea</h3>
							<label>
								Nombre de la Línea
								<input value={nombre} placeholder="Nombre de la Línea" onChange={(e) => setNombre(e.target.value)} required />
							</label>
							<label>
								Norma
								<input value={norma} placeholder="Ingrese la norma de la línea" onChange={(e) => setNorma(e.target.value)} required />
							</label>
							<label>
								Usos
								<textarea
									value={usos}
									placeholder="Ingrese los usos de la línea"
									onChange={(e) => setUsos(e.target.value)}
									required
								/>
							</label>
							<div className={styles.modalActions}>
								<button type="submit" className={styles.addButton}>Guardar</button>
								<button type="button" className={styles.cancelButton} onClick={onClose}>Cancelar</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
