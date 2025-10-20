import React from "react";
import styles from "./StatusHistoryTable.module.css";
import MapCard from "../mapCard/MapCard";
import IconSVG from "../../../Icons/IconSVG";

export interface StatusChange {
  estadoAnterior: string;
  estadoNuevo: string;
  observacion: string;
  fechaCambio: string;
  usuarioNombre: string;
  usuarioEmail: string;
}

interface TableProps {
  changes: StatusChange[];
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const StatusHistoryTable: React.FC<TableProps> = ({ changes }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Cambio de Estado</th>
            <th>Observación</th>
            <th>Fecha</th>
            <th>Usuario</th>
          </tr>
        </thead>
        <tbody>
          {changes.map((change, index) => (
            <tr key={index}>
              <td>
                <div className={styles.statusRow}>
                  <MapCard
                    property="estadoCotizacion"
                    value={change.estadoAnterior}
                  />
                  <IconSVG name="arrowRight" size={24} />
                  <MapCard
                    property="estadoCotizacion"
                    value={change.estadoNuevo}
                  />
                </div>
              </td>
              <td>{change.observacion}</td>
              <td>{formatDate(change.fechaCambio)}</td>
              <td>
                <div>
                  <p className={styles.userName}>{change.usuarioNombre}</p>
                  <p className={styles.userEmail}>{change.usuarioEmail}</p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
