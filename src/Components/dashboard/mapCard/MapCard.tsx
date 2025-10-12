import styles from "./MapCard.module.css";

interface MapCardProps {
  propertie: "tipoMensaje" | "estadoCotizacion" | "estadoMensaje";
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
    case "CERRADA":
      return "Cerrada";
    case "RESUELTO":
      return "Resuelto";
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
  Queja: {
    color: "var(--orange)",
    background: "var(--light-orange)",
  },
  Reclamo: {
    color: "var(--red)",
    background: "var(--light-red)",
  },
  Contáctenos: {
    color: "var(--purple)",
    background: "var(--light-purple)",
  },

  Desconocido: {
    color: "var(--gray)",
    background: "var(--light-gray)",
  },
};

function MapCard({ propertie, value }: MapCardProps) {
  let formattedValue = value;
  switch (propertie) {
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
