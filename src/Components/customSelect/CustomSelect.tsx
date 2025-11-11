import React, { useState } from "react";
import style from "./CustomSelect.module.css";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);

  const handleSelect = (option: Option) => {
    setSelected(option);
    onChange?.(option.value);
    setOpen(false);
  };

  return (
    <div className={style.customSelect}>
      <div
        className={`${style.selectBox} ${open ? style.open : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`${style.arrow} ${open ? style.arrowRotate : ""}`}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {open && (
        <ul className={style.selectDropdown}>
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`${style.selectOption} ${
                selected?.value === opt.value ? style.selectOptionActive : ""
              }`}
              onClick={() => handleSelect(opt)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
