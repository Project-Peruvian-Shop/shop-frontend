import { useEffect, useState } from "react";
import trashIcon from "../../Icons/trash.svg";
import styles from "./CartTable.module.css";
import {
  actualizarCantidadEnCart,
  eliminarProductoDelCart,
  getCartFromLocalStorage,
  type CartProductoDTO,
} from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";
import { obtenerUsuario } from "../../utils/auth";

export default function CartTable() {
  const [cart, setCart] = useState<CartProductoDTO[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(getCartFromLocalStorage());
  }, []);

  const totalProductos = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = () => {
    const usuario = obtenerUsuario();
    if (!usuario) {
      navigate(routes.login);
    } else {
      navigate(routes.checkout);
    }
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Cantidad</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id} className={styles.row}>
              <td className={styles.productCell}>
                <img
                  src={item.imagenUrl}
                  alt={item.imagenAlt}
                  className={styles.productImage}
                />
                <span>{item.nombre}</span>
              </td>
              <td>{item.categoriaNombre}</td>
              <td className={styles.quantityCell}>
                <button
                  className={styles.quantityButton}
                  onClick={() =>
                    actualizarCantidadEnCart(cart, setCart, item.id, -1)
                  }
                >
                  -
                </button>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => {
                    const nuevaCantidad = Math.max(
                      1,
                      parseInt(e.target.value) || 1
                    );
                    actualizarCantidadEnCart(
                      cart,
                      setCart,
                      item.id,
                      nuevaCantidad - item.quantity
                    );
                  }}
                  className={styles.quantityInput}
                />{" "}
                <button
                  className={styles.quantityButton}
                  onClick={() =>
                    actualizarCantidadEnCart(cart, setCart, item.id, 1)
                  }
                >
                  +
                </button>
              </td>
              <td>
                <img
                  src={trashIcon}
                  alt="Eliminar"
                  className={styles.trashIcon}
                  onClick={() =>
                    eliminarProductoDelCart(cart, setCart, item.id)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.footer}>
        <div>Total de productos: {totalProductos}</div>
        <button
          className={styles.btnWhite}
          onClick={() => navigate(routes.shop)}
        >
          Volver a la tienda
        </button>
        <button className={styles.btnBlue} onClick={handleCheckout}>
          Solicitar cotización
        </button>
      </div>
    </div>
  );
}
