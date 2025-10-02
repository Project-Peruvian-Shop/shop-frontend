import styles from "./ProductoDetalle.module.css";

function ProductoDetalle() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          Producto {"Tuberias para Alcantarillado 110mm UF"}
        </div>
        <div className={styles.actions}>
          <button className={styles.editButton}>Editar</button>
          <button className={styles.deleteButton}>Eliminar</button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.datos}></div>
          <div className={styles.detalles}></div>
        </div>
        <div className={styles.right}>
          <img src="" alt="Producto" className={styles.productImage} />
        </div>
      </div>
    </div>
  );
}

export default ProductoDetalle;
