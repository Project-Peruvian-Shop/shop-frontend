import { Icons } from "../../../Icons/icons";
import { RRSS } from "../../../utils/links";
import style from "./Redes.module.css";
const Redes = () => {
  return (
    <div className={style.containerContacto}>
      <div className={style.containerRedes}>
        <p>Whatsapp</p>
        <p>+51 922 723 633</p>
      </div>
      <div className={style.containerRedes}>
        <p>Email</p>
        <p>wilmer.guevara@tuberiasperuanito.com</p>
      </div>
      <div className={style.containerRedes}>
        <p>Redes Sociales</p>
        <span>
          <a href={RRSS.whatsapp} target="_ blank" rel="noopener noreferrer">
            <img src={Icons.whatsappPri} alt="whatsapp" />
          </a>
        </span>
        <span>
          <a href={RRSS.facebook} target="_blank" rel="noopener noreferrer">
            <img src={Icons.facebook} alt="facebook" />
          </a>
        </span>
        <span>
          <a href={RRSS.instagram} target="_blank" rel="noopener noreferrer">
            <img src={Icons.instagram} alt="instagram" />
          </a>
        </span>
        <span>
          <a href={RRSS.tiktok} target="_blank" rel="noopener noreferrer">
            <img src={Icons.tiktok} alt="tiktok" />
          </a>
        </span>
      </div>
    </div>
  );
};

export default Redes;
