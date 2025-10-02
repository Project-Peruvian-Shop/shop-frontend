import React from "react";
import styles from "./InfoCard.module.css";

interface InfoItem {
  label: string;
  value: string | number;
}

interface InfoCardProps {
  title: string;
  items: InfoItem[];
}

const InfoCard: React.FC<InfoCardProps> = ({ title, items }) => {
  return (
    <div className={styles.card}>
      <div className={styles.subtitle}>{title}</div>
      {items.map((item, index) => (
        <div className={styles.infoRow} key={index}>
          <span className={styles.label}>{item.label}</span>
          <span className={styles.value}>{item.value}</span>
        </div>
      ))}
    </div>
  );
};

export default InfoCard;
