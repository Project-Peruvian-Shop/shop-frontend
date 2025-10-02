import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import type { AllAndQuantityResponseDTO } from "../../../models/Categoria/Categoria_response";

export interface SidebarProps {
  arrayCategories: AllAndQuantityResponseDTO[];
}

function Sidebar(props: SidebarProps) {
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.title}>CATEGORÍAS</div>

      <div className={styles.divisor}></div>

      <div className={styles.listContainer}>
        {props.arrayCategories.map((category) => (
          <Link key={category.id} className={styles.categoryItem} to="#">
            {category.nombre} ({category.cantidad})
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
