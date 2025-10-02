import { useNavigate, useParams } from "react-router-dom";
import styles from "./CategoriaDetalle.module.css";
import { useEffect, useState } from "react";
import { routes } from "../../../utils/routes";
import { getCategoryById } from "../../../services/categoria.service";
import type { CategoriaDashboardDTO } from "../../../models/Categoria/Categoria_response";

function CategoriaDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState<CategoriaDashboardDTO | null>(
    null
  );

  useEffect(() => {
    if (!id) {
      navigate(routes.dashboard);
      return;
    }

    const fetchCategoria = async (id: string) => {
      try {
        const data = await getCategoryById(Number(id));
        setCategoria(data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        navigate(routes.dashboard_products);
      }
    };

    fetchCategoria(id);
  }, [id, navigate]);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Categoría {categoria?.norma}</div>
        <div className={styles.actions}>
          <button className={styles.editButton}>Editar</button>
          <button className={styles.deleteButton}>Eliminar</button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.card}>
            <div className={styles.subtitle}>Datos de la Categoría</div>
            <div className={styles.infoRow}>
              <span className={styles.label}>ID:</span>
              <span className={styles.value}>{categoria?.id}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Nombre:</span>
              <span className={styles.value}>{categoria?.nombre}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Norma:</span>
              <span className={styles.value}>{categoria?.norma}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Usos:</span>
              <span className={styles.value}>
                {categoria?.usos}
                duradera.
              </span>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.subtitle}>Productos de la categoría</div>
          </div>
        </div>
        <div className={styles.right}>
          <img
            src={categoria?.imagenEnlace}
            alt={categoria?.imagenAlt}
            className={styles.categoriaImage}
          />
        </div>
      </div>
    </div>
  );
}

export default CategoriaDetalle;
