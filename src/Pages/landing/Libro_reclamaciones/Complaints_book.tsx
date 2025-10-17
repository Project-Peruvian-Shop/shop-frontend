import style from "./Complaints_book.module.css";
import Header from "../../../Components/header/Header";
import FormLibro from "../../../Components/landing/Libro_reclamaciones/FormLibro";
import Redes from "../../../Components/landing/Contactenos/Redes";

const Complaints_book = () => {
  return (
    <main>
      <Header nombre="Libro de Reclamaciones" />

      <div className={style.intro}>
        <p>
          Aquí puedes registrar una queja, presentar un reclamo o enviar
          sugerencias fácilmente. Tu opinión es importante para nosotros y
          estamos comprometidos en mejorar continuamente nuestro servicio. Por
          favor, proporciona toda la información necesaria para que podamos
          atender tu solicitud de manera rápida y efectiva.
        </p>
      </div>

      <Redes/>

      <FormLibro />
    </main>
  );
};

export default Complaints_book;
