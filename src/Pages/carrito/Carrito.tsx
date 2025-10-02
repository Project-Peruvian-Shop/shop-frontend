import Header from "../../Components/header/Header";
import styles from "./Carrito.module.css";

function Carrito() {
  return (
    <div className={styles.carritoContainer}>
      <Header nombre="Carrito de productos" />
    </div>
  );
}

export default Carrito;
