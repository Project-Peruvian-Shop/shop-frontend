import { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";
import IconSVG from "../../../Icons/IconSVG";
import type { PaginatedResponse } from "../../../services/global.interfaces";

interface SearchBarProps<T> {
  placeholder?: string;
  searchService: (
    query: string,
    page?: number
  ) => Promise<PaginatedResponse<T>>;
  onResults: (results: PaginatedResponse<T> | null) => void;
  minLength?: number;
  debounce?: number;
  page?: number;
}

function SearchBar<T>({
  placeholder = "Buscar...",
  searchService,
  onResults,
  minLength = 3,
  debounce = 500,
  page = 0,
}: SearchBarProps<T>) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (query.trim().length >= minLength) {
        setIsSearching(true);
        try {
          const results = await searchService(query, page);
          onResults(results);
        } catch (error) {
          console.error("Error en la búsqueda:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        onResults(null);
      }
    }, debounce);

    return () => clearTimeout(delay);
  }, [query, page, debounce, minLength, searchService, onResults]);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <IconSVG name="search" size={16} className={styles.searchIcon} />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
        />
        {isSearching && <span className={styles.loadingText}>Buscando...</span>}
      </div>
    </div>
  );
}

export default SearchBar;
