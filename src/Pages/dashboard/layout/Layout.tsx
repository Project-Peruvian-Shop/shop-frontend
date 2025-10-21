import { Outlet, useNavigate } from "react-router-dom";
import SideBarDashboard from "../../../Components/dashboard/sidebar/SideBarDashboard";
import styles from "./Layout.module.css";
import { useEffect } from "react";
import { obtenerAuthToken } from "../../../utils/auth";
import { routes } from "../../../utils/routes";

export default function DashboardLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = obtenerAuthToken();

    if (!token) {
      navigate(routes.login, { replace: true });
    }

  }, [navigate]);

  return (
    <div className={styles.layout}>
      <SideBarDashboard />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
