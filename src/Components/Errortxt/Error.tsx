import styles from "./Error.module.css";

interface ErrorProps {
  message: string;
}

const Error = ({ message }: ErrorProps) => {
  return <span className={styles.errorText}>{message}</span>;
};

export default Error;
