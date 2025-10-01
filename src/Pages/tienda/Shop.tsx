import Sidebar from "../../Components/shop/sidebar/Sidebar";
import SubHeader from "../../Components/shop/subheader/SubHeader";
import { mockSidebar } from "../../utils/mock";

const Shop = () => {
  return (
    <>
      <SubHeader />

      <Sidebar arrayCategories={mockSidebar.arrayCategories} />

      <div>Productos</div>
    </>
  );
};

export default Shop;
