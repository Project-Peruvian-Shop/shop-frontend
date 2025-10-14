import { useState } from "react";
import styles from "./ModalMensajes.module.css";
import type { MensajeDashboardDTO } from "../../../../models/Mensaje/Mensaje_response_dto";
import type { ChangeStateMensajeRequestDTO } from "../../../../models/Mensaje/Mensaje_request_dto";
interface ModalMensajesProps {
  mensaje: MensajeDashboardDTO;
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
                <select
                  className={styles.select}
                  value={nuevoEstado?.nuevoEstado}
                  onChange={(e) =>
                    setNuevoEstado({
                      nuevoEstado: e.target.value as
                        | "PENDIENTE"
                        | "EN_PROCESO"
                        | "RESUELTO"
                        | "CERRADO",
                    })
                  }
                  required
                >
                  <option value="PENDIENTE">Pendiente</option>
                  <option value="EN_PROCESO">En proceso</option>
                  <option value="RESUELTO">Resuelto</option>
                  <option value="CERRADO">Cerrado</option>
                </select>
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
