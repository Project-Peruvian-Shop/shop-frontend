import { Link } from "react-router-dom";
import Button from "../../Button";
import type React from "react";
import styles from "./Card.module.css";

type CardProps = {
  img: string;
  title: React.ReactNode;
  alt: string;
  link: string;
  visible: boolean;
};

const Card = ({ img, title, alt, link, visible }: CardProps) => {
  return (
    <Link to={link} className={styles.card}>
      <div className={styles.imgContainer}>
        <img src={img} alt={alt} className={styles.img} />
      </div>

      <div className={styles.title}>{title}</div>

      {visible ? (
        <Button
          text="Añadir al carrito"
          css=""
          onClick={() => alert("Funcionalidad en desarrollo")}
        />
      ) : null}
    </Link>
  );
};

export default Card;
