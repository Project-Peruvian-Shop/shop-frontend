import { useEffect, useState } from "react";
import trashIcon from "../../../Icons/trash.svg";
import styles from "./CartTable.module.css";
import {
  actualizarCantidadEnCart,
  eliminarProductoDelCart,
  getCartFromLocalStorage,
  type CartProductoDTO,
} from "../../../utils/localStorage";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../../utils/routes";
import { obtenerUsuario } from "../../../utils/auth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function CartTable() {
  const [cart, setCart] = useState<CartProductoDTO[]>([]);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    setCart(getCartFromLocalStorage());
  }, []);

  const totalProductos = cart.reduce((acc, item) => acc + item.cantidad, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      MySwal.fire({
        icon: "warning",
        title: "Carrito vacío",
        text: "No tienes productos en el carrito. Agrega productos antes de continuar.",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    const usuario = obtenerUsuario();
    if (!usuario) {
      navigate(routes.login);
    } else {
      navigate(routes.checkout);
    }
  };

  return (
    <div className={styles.container}>
      {cart.length === 0 ? (
        <div className={styles.emptyCart}>
          <h2>Tu carrito está vacío 🛒</h2>
          <p>Agrega productos para solicitar tu cotización.</p>
          <button
            className={styles.btnBlue}
            onClick={() => navigate(routes.shop)}
          >
            Ir a la tienda
          </button>
        </div>
      ) : (
        <>
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
                    <Link to={`/producto/${item.id}`}>
                      <span>{item.nombre}</span>
                    </Link>
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
                      value={item.cantidad}
                      onChange={(e) => {
                        const nuevaCantidad = Math.max(
                          1,
                          parseInt(e.target.value) || 1
                        );
                        actualizarCantidadEnCart(
                          cart,
                          setCart,
                          item.id,
                          nuevaCantidad - item.cantidad
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
        </>
      )}
    </div>
  );
}
