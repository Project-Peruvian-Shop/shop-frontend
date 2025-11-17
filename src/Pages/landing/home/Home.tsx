import Banner from "../../../Components/banner/Banner";
import Card from "../../../Components/home/card/Card";
import { routes } from "../../../utils/routes";
import shop from "../../../Icons/Home/shop.png";
import document from "../../../Icons/Home/document.png";
import questions from "../../../Icons/Home/questions.png";
import alcantarillado from "../../../Icons/Home/alcantarillado.png";
import desague from "../../../Icons/Home/Desagüe.png";
import fluidoapresionUF from "../../../Icons/Home/Fluidos_a_presion_UF.png";
import fluidoapresionSP from "../../../Icons/Home/Fluidos_a_presion_SP.png";
import fluidoapresionUR from "../../../Icons/Home/Fluidos_a_presion_UR.png";
import instalacioneselectricas from "../../../Icons/Home/Instalaciones_electricas.png";
import Hero from "../../../Components/home/hero/Hero";
import styles from "./Home.module.css";

const categorias = {
  fluidoSP: 1,
  desague: 2,
  electricas: 3,
  fluidoUR: 4,
  fluidoUF: 5,
  alcantarillado: 6,
};

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
        />
        <Card
          img={document}
          title="Asesoramiento técnico"
          alt="Document-icon"
          link={routes.contact}
        />
        <Card
          img={questions}
          title="Preguntas frecuentes"
          alt="Questions-icon"
          link={routes.questions}
        />
      </div>

      <Banner title="NUESTROS PRODUCTOS" />

      <div className={styles.containerProductos}>
        <Card
          img={alcantarillado}
          title="Alcantarillado"
          alt="Alcantarillado-icon"
          link={`${routes.shop}?categoriaId=${categorias.alcantarillado}`}
        />
        <Card
          img={desague}
          title="Desagüe"
          alt="Desagüe-icon"
          link={`${routes.shop}?categoriaId=${categorias.desague}`}
        />
        <Card
          img={fluidoapresionUF}
          title="Fluidos a presión UF"
          alt="Fluidos-a-presion-UF-icon"
          link={`${routes.shop}?categoriaId=${categorias.fluidoUF}`}
        />
      </div>

      <div className={styles.containerProductos}>
        <Card
          img={fluidoapresionSP}
          title="Fluido a presión SP"
          alt="Fluido-a-presion-SP-icon"
          link={`${routes.shop}?categoriaId=${categorias.fluidoSP}`}
        />
        <Card
          img={fluidoapresionUR}
          title="Fluido a presión UR"
          alt="Fluido-a-presion-UR-icon"
          link={`${routes.shop}?categoriaId=${categorias.fluidoUR}`}
        />
        <Card
          img={instalacioneselectricas}
          title="Instalaciones Electricas"
          alt="Instalaciones-Electricas-icon"
          link={`${routes.shop}?categoriaId=${categorias.electricas}`}
        />
      </div>
    </main>
  );
};

export default Home;
