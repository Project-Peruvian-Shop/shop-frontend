import { Link } from "react-router-dom";
import type React from "react";
import styles from "./Card.module.css";

type CardProps = {
  img: string;
  title: React.ReactNode;
  alt: string;
  link: string;
};

const Card = ({ img, title, alt, link }: CardProps) => {
  return (
    <Link to={link} className={styles.card}>
      <div className={styles.imgContainer}>
        <img src={img} alt={alt} className={styles.img} />
      </div>

      <div className={styles.title}>{title}</div>
    </Link>
  );
};

export default Card;
