import { useState, useEffect } from "react";
import styles from "./ModalObservaciones.module.css";
import type { CotizacionDashboardDTO } from "../../../../models/Cotizacion/Cotizacion_response_dto";

interface ModalObservacionProps {
  show: boolean;
  cotizacion: CotizacionDashboardDTO | null;
  onClose: () => void;
  onSubmit: (id: number, observacion: string) => Promise<void>;
}

const ModalObservacion = ({
  show,
  cotizacion,
  onClose,
  onSubmit,
}: ModalObservacionProps) => {
  const [observacion, setObservacion] = useState(
    cotizacion?.observaciones || ""
  );

  useEffect(() => {
    if (cotizacion) {
      setObservacion(cotizacion.observaciones || "");
    }
  }, [cotizacion]);

  if (!show || !cotizacion) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Editar Observaciones</h3>
        <label>
          Observaciones:
          <textarea
            value={observacion}
            onChange={(e) => setObservacion(e.target.value)}
            rows={5}
            className={styles.textarea}
            required
          />
        </label>
        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancelar
          </button>
          <button
            onClick={() => onSubmit(cotizacion.id, observacion)}
            className={styles.addButton}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalObservacion;
