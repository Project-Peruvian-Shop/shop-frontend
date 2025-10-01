import styles from "./ButtonPrimary.module.css";

interface ButtonPrimaryProps {
  text: string;
  click: () => void;
}

function ButtonPrimary(props: ButtonPrimaryProps) {
  const { text, click } = props;

  return (
    <button className={styles.btn} onClick={click}>
      {text}
    </button>
  );
}

export default ButtonPrimary;
