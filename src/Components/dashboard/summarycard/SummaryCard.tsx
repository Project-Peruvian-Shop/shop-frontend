import React from "react";
import styles from "./SummaryCard.module.css";
import IconSVG from "../../../Icons/IconSVG";

export type PeriodSummaryCard = "DAY" | "WEEK" | "MONTH";

const periodLabels: Record<PeriodSummaryCard, string> = {
  DAY: "Día",
  WEEK: "Semana",
  MONTH: "Mes",
};

interface SummaryCardProps {
  title: string;
  value: number;
  icon: "clipboard" | "check" | "message";
  color?: "blue" | "green" | "orange";
  period: PeriodSummaryCard;
  onPeriodChange: (p: PeriodSummaryCard) => void;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
  color = "blue",
  period,
  onPeriodChange,
}) => {
  const iconMap = {
    clipboard: <IconSVG name="clipboard" size={22} />,
    check: <IconSVG name="check" size={22} />,
    message: <IconSVG name="message" size={22} />,
  };

  const colorClass = {
    blue: styles.blue,
    green: styles.green,
    orange: styles.orange,
  }[color];

  return (
    <div className={`${styles.card} ${colorClass}`}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {iconMap[icon]}
      </div>

      <div className={styles.value}>{value}</div>

      <div className={styles.periodSwitch}>
        {(["DAY", "WEEK", "MONTH"] as PeriodSummaryCard[]).map((p) => (
          <button
            key={p}
            className={`${styles.periodButton} ${
              period === p ? styles.active : ""
            }`}
            onClick={() => onPeriodChange(p)}
          >
            {periodLabels[p]}
          </button>
        ))}
      </div>
    </div>
  );
};
