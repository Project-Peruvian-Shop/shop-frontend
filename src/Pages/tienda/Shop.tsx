import Products from "../../Components/shop/products/Products";
import Sidebar from "../../Components/shop/sidebar/Sidebar";
import SubHeader from "../../Components/shop/subheader/SubHeader";
import { mockSidebar } from "../../utils/mock";
import styles from "./Shop.module.css";

const Shop = () => {
  return (
    <>
      <SubHeader />

      <div className={styles.shopContainer}>
        <Sidebar arrayCategories={mockSidebar.arrayCategories} />

        <Products />
      </div>
    </>
  );
};

export default Shop;
