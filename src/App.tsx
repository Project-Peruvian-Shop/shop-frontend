import { Route, Routes, useLocation } from "react-router-dom";
import "./Styles/App.css";
import Home from "./Pages/home/Home.tsx";
import AboutCompany from "./Pages/quienes_somos/About_company.tsx";
import Shop from "./Pages/tienda/Shop.tsx";
import Navbar from "./Components/navbar/Navbar.tsx";
import Footer from "./Components/footer/Footer.tsx";
import { routes } from "./utils/routes.ts";
import Questions_frecuenly from "./Pages/preguntas_frecuentes/Questions_frecuenly.tsx";
import Policity from "./Pages/politica_de_privacidad/Policity.tsx";
import Notfound from "./Pages/Notfound.tsx";
import TermsAndConditions from "./Pages/terminos_y_condiciones/TermsAndConditions.tsx";
import Contact from "./Pages/Contact.tsx";
import Complaints_book from "./Pages/Complaints_book.tsx";
import Producto from "./Pages/producto/Producto.tsx";
import Carrito from "./Pages/carrito/Carrito.tsx";
import Login from "./Pages/login/Login.tsx";
import Register from "./Pages/register/Register.tsx";
import Checkout from "./Pages/checkout/Checkout.tsx";
import Profile from "./Pages/profile/Profile.tsx";
import Cotizacion from "./Pages/cotizacion/Cotizacion.tsx";
import Productos from "./Pages/dashboard/productos/Productos.tsx";
import Categorias from "./Pages/dashboard/categorias/Categorias.tsx";
import Mensajes from "./Pages/dashboard/mensajes/Mensajes.tsx";
import Cotizaciones from "./Pages/dashboard/cotizaciones/Cotizaciones.tsx";
import Usuarios from "./Pages/dashboard/usuarios/Usuarios.tsx";
import Dashboard from "./Pages/dashboard/principal/Dashboard.tsx";
import DashboardLayout from "./Pages/dashboard/layout/Layout.tsx";
import ProductoDetalle from "./Pages/dashboard/productodetail/ProductoDetalle.tsx";
import CategoriaDetalle from "./Pages/dashboard/categoriadetail/CategoriaDetalle.tsx";

function App() {
  const location = useLocation();

  const showNavbar =
    !location.pathname.startsWith("/dashboard") &&
    ![routes.login, routes.register].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        {/* Principal Pages */}
        <Route path={routes.NotFound} element={<Notfound />} />
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.about} element={<AboutCompany />} />
        <Route path={routes.questions} element={<Questions_frecuenly />} />
        <Route path={routes.contact} element={<Contact />} />
        <Route path={routes.complaints_book} element={<Complaints_book />} />
        <Route path={routes.tyc} element={<TermsAndConditions />} />
        <Route path={routes.privacy_policy} element={<Policity />} />

        {/* Shop Pages */}
        <Route path={routes.shop} element={<Shop />} />
        <Route path={`${routes.product}:id`} element={<Producto />} />
        <Route path={routes.shop_cart} element={<Carrito />} />
        <Route path={routes.checkout} element={<Checkout />} />

        {/* Auth Pages */}
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.register} element={<Register />} />

        {/* User Pages */}
        <Route path={routes.profile_user} element={<Profile />} />
        <Route
          path={`${routes.profile_cotization}:id`}
          element={<Cotizacion />}
        />

        {/* Dashboard con Layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Productos />} />
          <Route path="categories" element={<Categorias />} />
          <Route path="mensajes" element={<Mensajes />} />
          <Route path="cotizaciones" element={<Cotizaciones />} />
          <Route path="usuarios" element={<Usuarios />} />

          <Route path="product/:id" element={<ProductoDetalle />} />
          <Route path="category/:id" element={<CategoriaDetalle />} />
        </Route>
      </Routes>

      {showNavbar && <Footer />}
    </>
  );
}

export default App;
