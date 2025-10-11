import { Link } from "react-router-dom";
import IconSVG from "../../../Icons/IconSVG";
import styles from "./SubHeader.module.css";
import { useEffect, useState } from "react";
import { getCartFromLocalStorage } from "../../../utils/localStorage";
import { routes } from "../../../utils/routes";

export default function SubHeader() {
  const [cantidadCarrito, setCantidadCarrito] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const updatedItems = getCartFromLocalStorage();
      setCantidadCarrito(updatedItems.length);
    };

    // Inicial
    updateCartCount();

    // Escucha cambios globales del carrito
    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("storage", updateCartCount); // por si se abre en otra pestaña

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  return (
    <div className={styles.storebarContainer}>
      <div className={styles.storebarInner}>
        {/* Left: Store Icon & Title */}
        <div className={styles.storeTitle}>
          <IconSVG name="items" size={20} className={styles.storeIcon} />
          <span className={styles.storeText}>Tienda</span>
        </div>

        {/* Center: Search Bar */}
        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <IconSVG name="search" size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar productos…"
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* Right: Cart Button */}
        <Link to={routes.shop_cart} className={styles.cartButton}>
          <IconSVG name="cart" size={20} className={styles.cartIcon} />
          <span className={styles.cartText}>Carrito</span>
          <span className={styles.cartBadge}>{cantidadCarrito}</span>
        </Link>
      </div>
    </div>
  );
}
