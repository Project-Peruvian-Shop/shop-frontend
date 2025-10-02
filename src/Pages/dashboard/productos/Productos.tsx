import { useEffect, useState } from "react";
import styles from "./Productos.module.css";
import type { PaginatedResponse } from "../../../services/global.interfaces";
import type { ProductoDashboardDTO } from "../../../models/Producto/Producto_response_dto";
import { getAllProductos } from "../../../services/producto.service";
import viewIcon from "../../../Icons/view-db.svg";
import editIcon from "../../../Icons/edit-db.svg";
import trashIcon from "../../../Icons/trash-db.svg";

export default function ProductosTable() {
  const [productos, setProductos] = useState<ProductoDashboardDTO[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadProductos(page);
  }, [page]);

  const loadProductos = async (page: number) => {
    try {
      const res: PaginatedResponse<ProductoDashboardDTO> =
        await getAllProductos(page, 5);
      setProductos(res.content);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td className={styles.nombreCell}>
                <img
                  src={p.imagenEnlace}
                  alt={p.imagenAlt}
                  className={styles.imagen}
                />
                <span>{p.nombre}</span>
              </td>
              <td>{p.categoriaNombre}</td>
              <td>{p.descripcion}</td>
              <td>
                <button className={styles.view}>
                  <img src={viewIcon} alt="Ver" />
                </button>
                <button className={styles.edit}>
                  <img src={editIcon} alt="Editar" />
                </button>
                <button className={styles.delete}>
                  <img src={trashIcon} alt="Eliminar" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button
          disabled={page === 0}
          onClick={() => setPage((prev) => prev - 1)}
        >
          ◀ Anterior
        </button>
        <span>
          Página {page + 1} de {totalPages}
        </span>
        <button
          disabled={page === totalPages - 1}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Siguiente ▶
        </button>
      </div>
    </div>
  );
}
