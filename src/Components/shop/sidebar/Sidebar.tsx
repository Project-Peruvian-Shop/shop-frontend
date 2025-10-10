import styles from "./Sidebar.module.css";
import type { AllAndQuantityResponseDTO } from "../../../models/Categoria/Categoria_response";

export interface SidebarProps {
  arrayCategories: AllAndQuantityResponseDTO[];
  onCategoryClick?: (categoryId: number | null) => void;
}

function Sidebar(props: SidebarProps) {
  const { arrayCategories, onCategoryClick } = props;

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.title}>CATEGORÍAS</div>

      <div className={styles.divisor}></div>

      <div className={styles.listContainer}>
        {arrayCategories.map((category) => (
          <button
            key={category.id}
            className={styles.categoryItem}
            onClick={() => onCategoryClick?.(category.id)}
          >
            {category.nombre} ({category.cantidad})
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
