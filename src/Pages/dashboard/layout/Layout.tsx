import { Outlet } from "react-router-dom";
import SideBarDashboard from "../../../Components/dashboard/SideBarDashboard";
import styles from "./Layout.module.css";

export default function DashboardLayout() {
  return (
    <div className={styles.layout}>
      <SideBarDashboard />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
