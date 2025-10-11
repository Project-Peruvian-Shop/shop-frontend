import IconSVG from "../../../Icons/IconSVG";
import styles from "./SubHeader.module.css";

export default function SubHeader() {
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
        <button className={styles.cartButton}>
          <IconSVG name="cart" size={20} className={styles.cartIcon} />
          <span className={styles.cartText}>Carrito</span>
          <span className={styles.cartBadge}>3</span>
        </button>
      </div>
    </div>
  );
}
