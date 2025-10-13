import styles from "./MapCard.module.css";

interface MapCardProps {
  property: "tipoMensaje" | "estadoCotizacion" | "estadoMensaje";
  value: string;
}

// === MAPPERS ===
const mapperEstadoCotizacion = (estado: string) => {
  switch (estado) {
    case "PENDIENTE":
      return "Pendiente";
    case "EN_PROCESO":
      return "En proceso";
    case "ENVIADA":
      return "Enviada";
    case "ACEPTADA":
      return "Aceptada";
    case "RECHAZADA":
      return "Rechazada";
    case "CERRADA":
      return "Cerrada";
    default:
      return "Desconocido";
  }
};

const mapperTipoMensaje = (tipo: string) => {
  switch (tipo) {
    case "CONTACTENOS":
      return "Contáctenos";
    case "QUEJA":
      return "Queja";
    case "RECLAMO":
      return "Reclamo";
    default:
      return "Desconocido";
  }
};

const mapperEstadoMensaje = (estado: string) => {
  switch (estado) {
    case "PENDIENTE":
      return "Pendiente";
    case "EN_PROCESO":
      return "En proceso";
    case "RESUELTO":
      return "Resuelto";
    case "CERRADO":
      return "Cerrado";
    default:
      return "Desconocido";
  }
};

// === PALETA DE COLORES ===
const colorPalette: Record<string, { color: string; background: string }> = {
  Pendiente: {
    color: "var(--yellow)",
    background: "var(--light-yellow)",
  },
  "En proceso": {
    color: "var(--orange)",
    background: "var(--light-orange)",
  },
  Enviada: {
    color: "var(--blue)",
    background: "var(--light-blue)",
  },
  Aceptada: {
    color: "var(--green)",
    background: "var(--light-green)",
  },
  Rechazada: {
    color: "var(--primary-color)",
    background: "var(--light-primary-color)",
  },
  Cerrada: {
    color: "var(--gray)",
    background: "var(--light-gray)",
  },

  Resuelto: {
    color: "var(--green)",
    background: "var(--light-green)",
  },
  Cerrado: {
    color: "var(--gray)",
    background: "var(--light-gray)",
  },

  Queja: {
    color: "var(--orange)",
    background: "var(--light-orange)",
  },
  Reclamo: {
    color: "var(--primary-color)",
    background: "var(--light-primary-color)",
  },
  Contáctenos: {
    color: "var(--blue)",
    background: "var(--light-blue)",
  },

  Desconocido: {
    color: "var(--gray)",
    background: "var(--light-gray)",
  },
};

function MapCard({ property, value }: MapCardProps) {
  let formattedValue = value;
  switch (property) {
    case "tipoMensaje":
      formattedValue = mapperTipoMensaje(value);
      break;
    case "estadoCotizacion":
      formattedValue = mapperEstadoCotizacion(value);
      break;
    case "estadoMensaje":
      formattedValue = mapperEstadoMensaje(value);
      break;
    default:
      formattedValue = "Desconocido";
  }

  const backgroundColor =
    colorPalette[formattedValue].background ||
    colorPalette["Desconocido"].background;

  const color =
    colorPalette[formattedValue].color || colorPalette["Desconocido"].color;

  return (
    <div className={styles.container}>
      <span
        className={styles.value}
        style={{
          backgroundColor,
          color,
        }}
      >
        {formattedValue}
      </span>
    </div>
  );
}

export default MapCard;
