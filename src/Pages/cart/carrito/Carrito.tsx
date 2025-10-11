import CartTable from "../../../Components/shop/carrito/CartTable";
import styles from "./Carrito.module.css";
import SubHeader from "../../../Components/shop/subheader/SubHeader";

function Carrito() {
  return (
    <div>
      <SubHeader title="Carrito" />

      <div className={styles.content}>
        <CartTable />
      </div>
    </div>
  );
}

export default Carrito;
