import { useEffect, useState } from "react";
import styles from "./ModalUsuarioCreate.module.css";
import userIcon from "../../../../Icons/Modal_user/user_add.svg";
import type { UsuarioUpdateRequestDto } from "../../../../models/Usuario/Usuario_request_dto";
interface ModalUsuarioEditProps {
  user: UsuarioUpdateRequestDto;
  onClose: () => void;
  onSubmit: (data: {
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    rol: "ROLE_ADMIN" | "ROLE_USER" | "ROLE_MANAGER";
  }) => Promise<void>;
}

export default function ModalUsuarioEdit({
  user,
  onClose,
  onSubmit,
}: ModalUsuarioEditProps) {
  const [nombre, setNombre] = useState(user.nombre);
  const [apellidos, setApellidos] = useState(user.apellidos);
  const [email, setEmail] = useState(user.email);
  const [telefono, setTelefono] = useState(user.telefono);
  const [rol, setRol] = useState<"ROLE_ADMIN" | "ROLE_USER" | "ROLE_MANAGER">(user.rol);

  useEffect(() => {
    setNombre(user.nombre);
    setApellidos(user.apellidos);
    setEmail(user.email);
    setTelefono(user.telefono);
    setRol(user.rol);
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      nombre,
      apellidos,
      email,
      telefono,
      rol,
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.imagenSection}>
              <h3>Información del usuario</h3>
              <img src={userIcon} alt="Usuario" />
            </div>
            <div className={styles.divider}></div>
            <div className={styles.datosSection}>
              <h3>Datos Personales</h3>
              <label>
                Nombres
                <input
                  value={nombre}
                  placeholder="Nombre del usuario"
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </label>
              <label>
                Apellidos
                <input
                  value={apellidos}
                  placeholder="Apellidos del usuario"
                  onChange={(e) => setApellidos(e.target.value)}
                  required
                />
              </label>
              <label>
                Correo Electrónico
                <input
                  value={email}
                  placeholder="Correo Electrónico"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                />
              </label>
              <label>
                Teléfono/Celular*
                <input
                  value={telefono}
                  placeholder="Teléfono del usuario"
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                />
              </label>
              <label>
                Rol
                <select
                  value={rol}
                  onChange={(e) =>
                    setRol(
                      e.target.value as
                        | "ROLE_ADMIN"
                        | "ROLE_USER"
                        | "ROLE_MANAGER"
                    )
                  }
                  required
                >
                  <option value="ROLE_ADMIN">Propetario</option>
                  <option value="ROLE_USER">Usuario</option>
                  <option value="ROLE_MANAGER">Administrador</option>
                </select>
              </label>
              <div className={styles.modalActions}>
                <button type="submit" className={styles.addButton}>
                  Guardar Usuario
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
