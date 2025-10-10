import CartTable from "../../../Components/cart/CartTable";
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
