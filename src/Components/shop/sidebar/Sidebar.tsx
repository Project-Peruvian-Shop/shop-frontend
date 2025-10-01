import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

export interface SidebarProps {
  arrayCategories: {
    id: number;
    name: string;
    quantity: number;
  }[];
}

function Sidebar(props: SidebarProps) {
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.title}>CATEGORÍAS</div>

      <div className={styles.divisor}></div>

      <div className={styles.listContainer}>
        {props.arrayCategories.map((category) => (
          <Link key={category.id} className={styles.categoryItem} to="#">
            {category.name} ({category.quantity})
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
