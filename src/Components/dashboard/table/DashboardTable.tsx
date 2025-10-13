import styles from "./DashboardTable.module.css";
import Pagination from "../../pagination/Pagination";

export interface Column<T> {
  header: string;
  accessor: keyof T;
  align?: "left" | "center" | "right";
  render?: (value: unknown, row: T) => React.ReactNode;
  className?: (value: unknown, row: T) => string;
}

export interface Action<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T) => void;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  actions?: Action<T>[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function DashboardTable<T extends { id: number | string }>({
  columns,
  data,
  actions,
  currentPage,
  totalPages,
  onPageChange,
}: TableProps<T>) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.header}
                className={`${styles.th} ${
                  col.align ? styles[col.align] : styles.left
                }`}
              >
                {col.header}
              </th>
            ))}
            {actions && actions.length > 0 && (
              <th className={styles.th}>Acciones</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className={styles.empty}
              >
                No hay registros
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id} className={styles.tr}>
                {columns.map((col) => {
                  const value = row[col.accessor];
                  const extraClass = col.className
                    ? col.className(value, row)
                    : "";
                  return (
                    <td
                      key={String(col.accessor)}
                      className={`${styles.td} ${
                        col.align ? styles[col.align] : styles.left
                      } ${extraClass}`}
                    >
                      {col.render ? col.render(value, row) : String(value)}
                    </td>
                  );
                })}

                {actions && actions.length > 0 && (
                  <td className={`${styles.td} ${styles.center}`}>
                    <div className={styles.actions}>
                      {actions.map((action, idx) => (
                        <button
                          key={idx}
                          className={styles.actionButton}
                          onClick={() => action.onClick(row)}
                          title={action.label}
                        >
                          {action.icon || action.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default DashboardTable;
