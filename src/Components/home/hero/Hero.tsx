import { useState, useEffect } from "react";
import Home1 from "../../../Images/Landing/Home-1.jpeg";
import Home2 from "../../../Images/Landing/Home-2.jpg";
import styles from "./Hero.module.css";

const images = [Home1, Home2];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000); // cada 3s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.hero}>
      {/* Todas las imágenes apiladas */}
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`banner-${i}`}
          className={`${styles.bgImage} ${i === index ? styles.active : ""}`}
        />
      ))}

      {/* Texto encima */}
      <div className={styles.overlay}>
        <h1>Tuberías Peruanito S.A.C.</h1>
        <span>Fluye con confianza, nuestros tubos lo garantizan.</span>
      </div>
    </div>
  );
};

export default Hero;
