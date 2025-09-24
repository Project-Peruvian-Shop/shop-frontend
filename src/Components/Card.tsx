
type CardProps = {
    img: string;
    title: string;
}

const Card = ({ img, title }: CardProps) => {
  return (
    <div>
        <img src={img} alt={title} />
        <h4>{title}</h4>
    </div>
  )
}

export default Card;