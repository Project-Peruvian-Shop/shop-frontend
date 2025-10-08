import styles from "./ButtonCard.module.css";

interface ButtonCardProps {
  icon: string;
  text: string;
  onClick: () => void;
  bgColor?: string;
}

export default function ButtonCard({
  icon,
  text,
  onClick,
  bgColor,
}: ButtonCardProps) {
  return (
    <button
      onClick={onClick}
      className={styles.card}
      style={bgColor ? { backgroundColor: bgColor } : {}}
    >
      <img src={icon} alt={text} className={styles.icon} />
      <span className={styles.text}>{text}</span>
    </button>
  );
}
