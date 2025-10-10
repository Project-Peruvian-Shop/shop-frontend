import { COLORS } from "../../../utils/constants";
import styles from "./ButtonCard.module.css";

export type VariantType = "primary" | "secondary" | "logout";

interface ButtonCardProps {
  icon: string;
  text: string;
  variant?: VariantType;
  onClick: () => void;
}

export default function ButtonCard({
  icon,
  text,
  variant = "primary",
  onClick,
}: ButtonCardProps) {
  const style = {
    primary: {
      borderColor: COLORS.primary,
      backgroundColor: COLORS.primary,
      color: COLORS.white,
    },
    secondary: {
      borderColor: COLORS.secondary,
      backgroundColor: COLORS.white,
      color: COLORS.secondary,
    },
    logout: {
      borderColor: COLORS.grayBtn,
      backgroundColor: COLORS.grayBtn,
      color: COLORS.white,
    },
  };

  return (
    <button onClick={onClick} className={styles.card} style={style[variant]}>
      <img src={icon} alt={text} className={styles.icon} />

      <span className={styles.text}>{text}</span>
    </button>
  );
}
