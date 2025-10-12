// SearchBar.tsx
import IconSVG from "../../../Icons/IconSVG";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchBar({
  placeholder = "Buscar...",
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <IconSVG name="search" size={16} className={styles.searchIcon} />

        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={styles.searchInput}
        />
      </div>
    </div>
  );
}

export default SearchBar;
