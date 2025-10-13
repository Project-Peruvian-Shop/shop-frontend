import styles from "./SideBar.module.css";
import logo from "../../Icons/Logo-HD.png";
import Icon from "../../Icons/star.svg";
import { Link } from "react-router-dom";
import { routes } from "../../utils/routes";

interface SideBarProps {
  title: string;
  subtitle: string;
  list: string[];
}

function SideBar(props: SideBarProps) {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link to={routes.home}>
          <img
            src={logo}
            alt="logo-tuberias-peruanito"
            className={styles.logo}
          />
        </Link>
      </div>
      <div className={styles.title}>{props.title}</div>

      <div className={styles.subtitle}>{props.subtitle}</div>

      <ul className={styles.list}>
        {props.list.map((item, index) => (
          <li key={index} className={styles.listItem}>
            <img src={Icon} alt="icon" className={styles.bulletIcon} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
