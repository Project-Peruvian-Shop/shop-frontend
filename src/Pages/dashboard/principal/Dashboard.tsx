import styles from "./Dashboard.module.css";

function Dashboard() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.graphic}>
          <div className={styles.title}>Total de cotizaciones por mes</div>
          <div className={styles.chart}></div>
        </div>

        <div className={styles.messageProducts}>
          <div className={styles.messages}>
            <div className={styles.title}>Mensajes Pendientes</div>
          </div>

          <div className={styles.productos}>
            <div className={styles.title}>Productos más cotizados del mes</div>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.topClients}>
          <div className={styles.title}>Últimas cotizaciones</div>
        </div>

        <div className={styles.topSellers}>
          <div className={styles.title}>Categorías más cotizadas</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
