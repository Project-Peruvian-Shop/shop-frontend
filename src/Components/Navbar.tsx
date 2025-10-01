import { Link } from "react-router-dom";
import Button from "./Button";
import logo from "../Icons/Logo-HD.png";
import { routes } from "../utils/routes.ts";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div>
        <Link to={routes.home}>
          <img
            src={logo}
            alt="Logo de la empresa Tuberías Peruanito"
            className="logo"
          />
        </Link>
      </div>
      <div className="links">
        <Link to={routes.home}>Inicio</Link>
        <Link to={routes.about}>¿Quiénes somos?</Link>
        <Link to={routes.shop}>Tienda</Link>
        <Link to={""}>Servicio</Link>
      </div>
      <div>
        <Button
          text="Contáctenos"
          onClick={() => alert("Contact us form coming soon!")}
          css="btn-primary"
        />
      </div>
    </nav>
  );
};
export default Navbar;
