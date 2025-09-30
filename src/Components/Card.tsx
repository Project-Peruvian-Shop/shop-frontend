import { Link } from "react-router-dom";
import Button from "./Button";
import type React from "react";

type CardProps = {
    img: string;
    title: React.ReactNode;
    alt : string;
    link : string;
    visible: boolean;
}

const Card = ({ img, title, alt, link, visible }: CardProps) => {
  return (
    <div>
      <Link to={link}>
        <img src={img} alt={alt} />
        <h4>{title}</h4>
      </Link>
      {visible ? <Button text="Añadir al carrito" css="" onClick={() => alert("Funcionalidad en desarrollo")}/> : null}
    </div>
  )
}

export default Card;