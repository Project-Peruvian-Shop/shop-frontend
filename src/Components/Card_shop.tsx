import Button from "./Button"

type CardShopProps = {
    img: string;
    title: string;
}
const Card_shop = ({ img, title }: CardShopProps) => {
    return (
    <div>
        <img src={img} alt={title} />
        <p>{title}</p>
        <Button css="" onClick={() => alert("Añadido al carrito")}>Añadir al carrito</Button>
    </div>
    )
}

export default Card_shop;