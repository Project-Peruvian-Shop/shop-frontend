import Banner from "../../Components/banner/Banner";
import Card from "../../Components/home/card/Card";
import { routes } from "../../utils/routes";
import shop from "../../Icons/Home/shop.png";
import document from "../../Icons/Home/document.png";
import questions from "../../Icons/Home/questions.png";
import alcantarillado from "../../Icons/Home/alcantarillado.png";
import desague from "../../Icons/Home/Desagüe.png";
import fluidoapresionUF from "../../Icons/Home/Fluidos_a_presion_UF.png";
import fluidoapresionSP from "../../Icons/Home/Fluidos_a_presion_SP.png";
import fluidoapresionUR from "../../Icons/Home/Fluidos_a_presion_UR.png";
import instalacioneselectricas from "../../Icons/Home/Instalaciones_electricas.png";
import Hero from "../../Components/home/hero/Hero";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <main>
      <Hero />

      <Banner title="ESPECIALIDADES" />

      <div className={styles.containerEspecialidades}>
        <Card
          img={shop}
          title="Cotización de tuberías"
          alt="Shop-icon"
          link={routes.shop}
          visible={false}
        />
        <Card
          img={document}
          title="Asesoramiento técnico"
          alt="Document-icon"
          link={routes.NotFound}
          visible={false}
        />
        <Card
          img={questions}
          title="Preguntas frecuentes"
          alt="Questions-icon"
          link={routes.questions}
          visible={false}
        />
      </div>

      <Banner title="Nuestros Productos" />

      <div className={styles.containerProductos}>
        {/* Cambiar las rutas de las categorias por las correctas */}
        <Card
          img={alcantarillado}
          title="Alcantarillado"
          alt="Alcantarillado-icon"
          link={routes.shop}
          visible={false}
        />
        <Card
          img={desague}
          title="Desagüe"
          alt="Desagüe-icon"
          link={routes.shop}
          visible={false}
        />
        <Card
          img={fluidoapresionUF}
          title="Fluidos a presión UF"
          alt="Fluidos-a-presion-UF-icon"
          link={routes.shop}
          visible={false}
        />
      </div>

      <div className={styles.containerProductos}>
        <Card
          img={fluidoapresionSP}
          title="Fluido a presión SP"
          alt="Fluido-a-presion-SP-icon"
          link={routes.shop}
          visible={false}
        />
        <Card
          img={fluidoapresionUR}
          title="Fluido a presión UR"
          alt="Fluido-a-presion-UR-icon"
          link={routes.shop}
          visible={false}
        />
        <Card
          img={instalacioneselectricas}
          title="Instalaciones Electricas"
          alt="Instalaciones-Electricas-icon"
          link={routes.shop}
          visible={false}
        />
      </div>
    </main>
  );
};

export default Home;
