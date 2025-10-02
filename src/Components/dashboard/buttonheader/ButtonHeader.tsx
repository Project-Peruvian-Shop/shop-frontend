import type { IconName } from "../../../Icons/icons";
import IconSVG from "../../../Icons/IconSVG";
import styles from "./ButtonHeader.module.css";

interface ButtonHeaderProps {
  title: string;
  onClick: () => void;
  icon: IconName;
  size?: number;
  style: "primary" | "secondary" | "primary-outline" | "secondary-outline";
}

function ButtonHeader(props: ButtonHeaderProps) {
  return (
    <div className={`${styles.button} ${styles[props.style]}`}>
      <div className={styles.icon}>
        <IconSVG name={props.icon} size={props.size} />
      </div>
      <div className={styles.title}>{props.title}</div>
    </div>
  );
}

export default ButtonHeader;
