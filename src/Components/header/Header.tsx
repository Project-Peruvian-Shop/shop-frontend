import styles from "./Header.module.css";

type HeaderProps = {
  nombre: string;
};

function Header(props: HeaderProps) {
  return <div className={styles.container}>{props.nombre}</div>;
}

export default Header;
