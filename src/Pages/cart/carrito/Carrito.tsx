import CartTable from "../../../Components/shop/carrito/CartTable";
import Header from "../../../Components/header/Header";
import styles from "./Carrito.module.css";

function Carrito() {
  return (
    <div>
      <Header nombre="Carrito de productos" />

      <div className={styles.content}>
        <CartTable />
      </div>
    </div>
  );
}

export default Carrito;
