import { useMemo } from "react";
import { useTable } from "react-table";
import styles from "./ADT-table.module.css";

function ADTable({ className, data }) {
  const tableData = useMemo(() => data, [data]);

  const columns = useMemo(
    () => [
      { Header: "Country", accessor: "country" },
      { Header: "Avg (by Air)", accessor: "avgByAir" },
      { Header: "Goal (by Air)", accessor: "goalByAir" },
      { Header: "Avg (by Sea)", accessor: "avgBySea" },
      { Header: "Goal (by Sea)", accessor: "goalBySea" },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: tableData });

  return (
    <div className={`${className} ${styles.tableContainer}`}>
      <p className={styles.title}>Performance Vs Goal Table</p>

      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column) => {
                  const { key, ...restColumnProps } = column.getHeaderProps();
                  return (
                    <th key={key} {...restColumnProps}>
                      {column.render("Header")}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <tr key={key} {...restRowProps}>
                {row.cells.map((cell) => {
                  const { key, ...restCellProps } = cell.getCellProps();
                  return (
                    <td key={key} {...restCellProps}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ADTable;
