import { useState } from "react";
import styles from "./ModalProductoCreate.module.css";
import add_img from "../../../../Icons/Modal_producto/add_img.svg";
import upload from "../../../../Icons/Modal_producto/upload_icon.svg";
import { CustomSelect } from "../../../customSelect/CustomSelect";

interface ModalProductoCreateProps {
  categorias: { id: number; nombre: string }[];
  onClose: () => void;
  onSubmit: (data: {
    nombre: string;
    descripcion: string;
    categoriaID: number;
    imagenFile: File | null;
  }) => Promise<void>;
}

export default function ModalProductoCreate({
  categorias,
  onClose,
  onSubmit,
}: ModalProductoCreateProps) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoriaID, setCategoriaID] = useState<number | string>("");
  const [imagenFile, setImagenFile] = useState<File | null>(null);
  const [imagenPreview, setImagenPreview] = useState<string | null>(null);

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
                onClick={() =>
                  document.getElementById("fileInputCreate")?.click()
                }
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
              <h3>Información del producto</h3>
              <label>
                Nombre del producto
                <input
                  value={nombre}
                  placeholder="Nombre del producto"
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </label>
              <label>
                Línea
                <CustomSelect
                  options={categorias.map((cat) => ({
                    value: cat.id.toString(),
                    label: cat.nombre,
                  }))}
                  onChange={(value) => setCategoriaID(value)}
                  placeholder={
                    categorias.find(
                      (cat) => cat.id.toString() === categoriaID.toString()
                    )?.nombre || "Selecciona una línea"
                  }
                />{" "}
              </label>
              <label>
                Descripción
                <textarea
                  value={descripcion}
                  placeholder="Ingrese la descripción del producto"
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
