import React from "react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number; // página actual (0-based)
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  // Calcular las páginas visibles (máximo 3)
  let pages: number[] = [];

  if (currentPage <= 1) {
    // caso inicial → 1,2,3
    pages = [0, 1, 2].filter((p) => p < totalPages);
  } else if (currentPage >= totalPages - 2) {
    // caso final → últimas 3
    pages = [totalPages - 3, totalPages - 2, totalPages - 1].filter(
      (p) => p >= 0
    );
  } else {
    // caso medio → página actual al centro
    pages = [currentPage - 1, currentPage, currentPage + 1];
  }

  return (
    <div className={styles.pagination}>
      {/* Botón anterior */}
      <button
        className={styles.pageButton}
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;
      </button>

      {/* Números */}
      {pages.map((p) => (
        <button
          key={p}
          className={`${styles.pageButton} ${
            p === currentPage ? styles.active : ""
          }`}
          onClick={() => onPageChange(p)}
        >
          {p + 1}
        </button>
      ))}

      {/* Botón siguiente */}
      <button
        className={styles.pageButton}
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
