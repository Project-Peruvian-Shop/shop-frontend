import { Link } from "react-router-dom";
import IconSVG from "../../../Icons/IconSVG";
import styles from "./SubHeader.module.css";
import { useEffect, useState } from "react";
import { getCartFromLocalStorage } from "../../../utils/localStorage";
import { routes } from "../../../utils/routes";

type SubHeaderProps = {
  title: string;
};

export default function SubHeader(props: SubHeaderProps) {
  const { title } = props;
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
        <div className={styles.titleContainer}>
          <Link to={routes.shop} className={styles.storeTitle}>
            {title}
            <Link to={routes.shop_cart} className={styles.cartSecondaryButton}>
              <IconSVG name="cart" size={20} className={styles.cartIcon} />
              <span className={styles.cartBadge}>{cantidadCarrito}</span>
            </Link>
          </Link>
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
