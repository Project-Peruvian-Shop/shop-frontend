import { useState } from "react";
import styles from "./ModalMensajes.module.css";
import type { MensajeDetalleResponseDTO } from "../../../../models/Mensaje/Mensaje_response_dto";
import type { ChangeStateMensajeRequestDTO } from "../../../../models/Mensaje/Mensaje_request_dto";
import { CustomSelect } from "../../../customSelect/CustomSelect";

type MensajeMinimo = Pick<MensajeDetalleResponseDTO, "id" | "estado">;

interface ModalMensajesProps {
  mensaje: MensajeMinimo;
  onClose: () => void;
  onSubmit: (
    id: number,
    nuevoEstado: "PENDIENTE" | "EN_PROCESO" | "RESUELTO" | "CERRADO"
  ) => Promise<void>;
}

function ModalMensajes({ mensaje, onClose, onSubmit }: ModalMensajesProps) {
  const [nuevoEstado, setNuevoEstado] = useState<ChangeStateMensajeRequestDTO>({
    nuevoEstado: mensaje.estado as
      | "PENDIENTE"
      | "EN_PROCESO"
      | "RESUELTO"
      | "CERRADO",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(
      mensaje.id,
      nuevoEstado?.nuevoEstado as
        | "PENDIENTE"
        | "EN_PROCESO"
        | "RESUELTO"
        | "CERRADO"
    );
  };
  const options = [
    { value: "PENDIENTE", label: "Pendiente" },
    { value: "EN_PROCESO", label: "En Proceso" },
    { value: "RESUELTO", label: "Resuelto" },
    { value: "CERRADO", label: "Cerrado" },
  ];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.imagenSection}>
              <h3>Editar estado del mensaje</h3>
            </div>
            <div className={styles.datosSection}>
              <label>
                Cambiar Estado
                <CustomSelect
                  options={options}
                  onChange={(value) =>
                    setNuevoEstado({
                      nuevoEstado: value as
                        | "PENDIENTE"
                        | "EN_PROCESO"
                        | "RESUELTO"
                        | "CERRADO",
                    })
                  }
                  placeholder={
                    options.find(
                      (option) => option.value === nuevoEstado.nuevoEstado
                    )?.label || "Selecciona un estado"
                  }
                />
              </label>
              <div className={styles.modalActions}>
                <button type="submit" className={styles.addButton}>
                  Guardar cambios
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
export default ModalMensajes;
