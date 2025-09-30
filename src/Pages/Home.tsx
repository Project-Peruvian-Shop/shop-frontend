import Banner from "../Components/Banner";
import Card from "../Components/Card";
import {routes} from "../utils/routes";
import Home1 from "../Images/Landing/Home-1.jpeg";
import Home2 from "../Images/Landing/Home-2.jpg";
import Home3 from "../Images/Landing/Home-3.jpg";
import shop from "../Icons/Home/shop.png";
import document from "../Icons/Home/document.png";
import questions from "../Icons/Home/questions.png";
import alcantarillado from "../Icons/Home/alcantarillado.png";
import desague from "../Icons/Home/Desagüe.png";
import fluidoapresionUF from "../Icons/Home/Fluidos_a_presion_UF.png";
import fluidoapresionSP from "../Icons/Home/Fluidos_a_presion_SP.png";
import fluidoapresionUR from "../Icons/Home/Fluidos_a_presion_UR.png";
import instalacioneselectricas from "../Icons/Home/Instalaciones_electricas.png";

const Home = () => {
    return (
    <main>
                <div>
                    <img src={Home1} alt="Banner 1"/>
                    <img src={Home2} alt="Banner 2"/>
                    <img src={Home3} alt="Banner 3"/>
                </div>
                <div>
                    <h1>Tuberias Peruanito S.A.C.</h1>
                    <span>Fluye con confianza, nuestros tubos lo garantizan.</span>
                </div>
                <Banner title="Especialidades"/>
                <div>
                    <Card img={shop} title="Cotización de tuberías" alt="Shop-icon" link={routes.shop} visible={false}/>
                    <Card img={document} title="Asesoramiento técnico" alt="Document-icon" link={routes.NotFound} visible={false}/>
                    <Card img={questions} title="Preguntas frecuentes" alt="Questions-icon" link={routes.questions} visible={false}/>
                </div>
                <Banner title="Nuestros Productos"/>
                <div>
                    {/* Cambiar las rutas de las categorias por las correctas */}
                    <Card img={alcantarillado} title="Alcantarillado" alt="Alcantarillado-icon" link={routes.shop} visible={false}/>
                    <Card img={desague} title="Desagüe" alt="Desagüe-icon" link={routes.shop} visible={false}/>
                    <Card img={fluidoapresionUF} title="Fluidos a presión UF" alt="Fluidos-a-presion-UF-icon" link={routes.shop} visible={false}/>
                    <Card img={fluidoapresionSP} title="Fluido a presión SP" alt="Fluido-a-presion-SP-icon" link={routes.shop} visible={false}/>
                    <Card img={fluidoapresionUR} title="Fluido a presión UR" alt="Fluido-a-presion-UR-icon" link={routes.shop} visible={false}/>
                    <Card img={instalacioneselectricas} title="Instalaciones Electricas" alt="Instalaciones-Electricas-icon" link={routes.shop} visible={false}/>
                </div>
    </main>
    )
}

export default Home;