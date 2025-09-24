import { Link } from "react-router-dom"
import Button from "./Button"
import logo from '../assets/react.svg'
import { routes } from '../utils/routes.ts'
const Navbar = () => {

    return (
        <nav>
            <img src={logo} />
            <Link to={routes.home}>Inicio</Link>
            <Link to={routes.about}>¿Quiénes somos?</Link>
            <Link to={routes.shop}>Tienda</Link>
            <Link to={routes.servicio}>Servicio</Link>
            <Button onClick={() => alert('Contact us form coming soon!')} css="btn-primary">
                Contactenos
            </Button>
        </nav>
    )   
}
export default Navbar;