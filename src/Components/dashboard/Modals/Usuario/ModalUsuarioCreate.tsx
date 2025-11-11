import { useState } from "react";
import styles from "./ModalUsuarioCreate.module.css";
import userIcon from "../../../../Icons/Modal_user/user_add.svg";
import {
  UserRoleConst,
  type UserRole,
} from "../../../../models/Usuario/Usuario";
import { CustomSelect } from "../../../customSelect/CustomSelect";
interface ModalUsuarioCreateProps {
  onClose: () => void;
  onSubmit: (data: {
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    passwordd: string;
    rol: UserRole;
  }) => Promise<void>;
}

export default function ModalUsuarioCreate({
  onClose,
  onSubmit,
}: ModalUsuarioCreateProps) {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [passwordd, setPasswordd] = useState("");
  const [rol, setRol] = useState<UserRole>(UserRoleConst.CLIENTE);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      nombre,
      apellidos,
      email,
      telefono,
      passwordd,
      rol,
    });
  };
  const options = [
    { value: UserRoleConst.SUPERADMIN, label: "Super Usuario" },
    { value: UserRoleConst.ADMINISTRADOR, label: "Administrador" },
    { value: UserRoleConst.SUPERVISOR, label: "Supervisor" },
    { value: UserRoleConst.CLIENTE, label: "Cliente" },
  ];

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
                Contraseña*
                <input
                  value={passwordd}
                  placeholder="Contraseña"
                  onChange={(e) => setPasswordd(e.target.value)}
                  required
                  type="password"
                />
              </label>
              <label>
                Rol
                <CustomSelect
                  options={options}
                  onChange={(value) => setRol(value as UserRole)}
                  placeholder={
                    options.find((option) => option.value === rol)?.label ||
                    "Selecciona un rol"
                  }
                />
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
