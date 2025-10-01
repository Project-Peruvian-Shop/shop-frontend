import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

type CardProps = {
  link: string;
  img: string;
  alt: string;
  title: string;
  click: () => void;
};

const ProductCard = ({ link, img, title, alt, click }: CardProps) => {
  return (
    <div className={styles.cardContainer}>
      <Link to={link} className={styles.link}>
        <div className={styles.imgContainer}>
          <img src={img} alt={alt} className={styles.img} />
        </div>

        <div className={styles.title}>{title}</div>
      </Link>

      <div className={styles.button} onClick={click}>
        Añadir al carrito
      </div>
    </div>
  );
};

export default ProductCard;
