import styles from "./Banner.module.css";

type BannerProps = {
  title: string;
};

const Banner = ({ title }: BannerProps) => {
  return (
    <div className={styles.title}>
      <h2>{title}</h2>
    </div>
  );
};

export default Banner;
