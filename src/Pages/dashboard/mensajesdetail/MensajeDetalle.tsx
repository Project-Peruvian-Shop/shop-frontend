import { useNavigate, useParams } from "react-router-dom";
import styles from "./MensajeDetalle.module.css";
import { useCallback, useEffect, useState } from "react";
import type { MensajeDetalleResponseDTO } from "../../../models/Mensaje/Mensaje_response_dto";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { routes } from "../../../utils/routes";
import {
  changeStateMensaje,
  getMensajeById,
} from "../../../services/mensajes.service";
import InfoCard from "../../../Components/dashboard/infocard/InfoCard";
import MapCard from "../../../Components/dashboard/mapCard/MapCard";
import ButtonCard, {
  type VariantType,
} from "../../../Components/dashboard/buttoncard/ButtonCard";
import { Icons } from "../../../Icons/icons";
import ModalMensajes from "../../../Components/dashboard/Modals/Mensajes/ModalMensajes";

const MensajeDetalle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState<MensajeDetalleResponseDTO | null>(
    null
  );
  const [modalShow, setModalShow] = useState(false);

  const MySwal = withReactContent(Swal);

  const fetchMessage = useCallback(
    async (mensajeId: number) => {
      try {
        const data = await getMensajeById(mensajeId);
        setMensaje(data);
      } catch (error) {
        console.error("Error al obtener el mensaje:", error);
        navigate(routes.dashboard_messages);
      }
    },
    [navigate]
  );
  useEffect(() => {
    if (!id) {
      navigate(routes.dashboard_messages);
      return;
    }
    fetchMessage(Number(id));
  }, [id, navigate, fetchMessage]);

  const openLink = (url: string, external: boolean = false) => {
    if (external || url.startsWith("http")) {
      window.open(url, "_blank");
    } else {
      navigate(url);
    }
  };
  const handleChangeState = async (
    id: number,
    nuevoEstado: "PENDIENTE" | "EN_PROCESO" | "RESUELTO" | "CERRADO"
  ) => {
    try {
      await changeStateMensaje(id, nuevoEstado);
      await fetchMessage(id);
      setModalShow(false);
      MySwal.fire({
        icon: "success",
        title: "Éxito",
        text: "El estado del mensaje ha sido actualizado.",
      });
    } catch (error: unknown) {
      let errorMessage = "Error al editar el estado del mensaje";

      type AxiosErrorLike = {
        isAxiosError?: boolean;
        response?: {
          data?: {
            message?: string;
          };
        };
      };
      const axiosError = error as AxiosErrorLike;

      if (axiosError.isAxiosError) {
        errorMessage = axiosError.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      MySwal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    }
  };
  const buttonData = [
    {
      icon: Icons.whatsappSec,
      text: "Contactar cliente por Whatsapp",
      variant: "secondary",
      onClick: () =>
        openLink(
          `https://web.whatsapp.com/send?phone=${mensaje?.telefono}`,
          true
        ),
    },
    {
      icon: Icons.outlook,
      text: "Contactar cliente por Email",
      variant: "primary",
      onClick: () =>
        openLink(
          `https://outlook.office.com/mail/deeplink/compose?to=${mensaje?.email}`,
          true
        ),
    },
    {
      icon: Icons.changeState,
      text: "Cambiar estado del mensaje",
      variant: "secondary",
      onClick: () => setModalShow(true),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Mensaje de: {mensaje?.nombre}</div>
      </div>
      <div className={styles.content}>
        <div className={styles.left}>
          <InfoCard
            title="Datos del mensaje"
            items={[
              {
                label: "Número de mensaje:",
                value: mensaje?.id || "",
              },
              {
                label: "Tipo:",
                value: (
                  <MapCard property="tipoMensaje" value={mensaje?.tipo || ""} />
                ),
              },
              {
                label: "Estado:",
                value: (
                  <MapCard
                    property="estadoMensaje"
                    value={mensaje?.estado || ""}
                  />
                ),
              },
              {
                label: "Fecha de mensaje:",
                value: mensaje?.creacion
                  ? new Date(mensaje.creacion).toLocaleDateString("es-PE", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : "",
              },
              { label: "Contenido:", value: mensaje?.contenido || "" },
            ]}
          />

          <InfoCard
            title="Datos de contacto"
            items={[
              {
                label: "Tipo documento:",
                value: mensaje?.tipoDocumento || "",
              },
              {
                label: "Nº documento:",
                value: mensaje?.documento || "",
              },
              { label: "Cliente:", value: mensaje?.nombre || "" },
              { label: "Email:", value: mensaje?.email || "" },
              {
                label: "Teléfono:",
                value: mensaje?.telefono || "",
              },
            ]}
          />
        </div>
        <div className={styles.right}>
          {/*<div className={styles.card}>
            <div className={styles.subtitle}>Observaciones</div>
            <div className={styles.observations}>
              {mensaje?.medio_respuesta || "No hay observaciones."}
            </div>
          </div>*/}
          <div className={styles.card}>
            <div className={styles.personal + " " + styles.buttonsGrid}>
              {buttonData.map((btn, index) => (
                <div className={styles.buttonWrapper} key={index}>
                  <ButtonCard
                    key={index}
                    icon={btn.icon}
                    text={btn.text}
                    variant={btn.variant as VariantType}
                    onClick={btn.onClick}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {modalShow && (
        <ModalMensajes
          mensaje={mensaje as MensajeDetalleResponseDTO}
          onClose={() => setModalShow(false)}
          onSubmit={handleChangeState}
        />
      )}
    </div>
  );
};

export default MensajeDetalle;
