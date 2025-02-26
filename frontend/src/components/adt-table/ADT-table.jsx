import { useMemo } from "react";
import { useTable } from "react-table";
import styles from "./ADT-table.module.css";

function ADTable({ className, data }) {
  const tabledata = useMemo(() => data, [data]);

  const columns = useMemo(
    () => [
      { Header: "Country", accessor: "country" },
      { Header: "Avg (by Air)", accessor: "avgByAir" },
      { Header: "Goal (by Air)", accessor: "goalByAir" },
      { Header: "Avg (by Sea)", accessor: "avgBySea" },
      { Header: "Goal (by Sea)", accessor: "goalBySea" },
      { Header: "Status", accessor: "status" }, // Ensure status is included
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: tabledata });

  return (
    <div className={`${className} ${styles.tableContainer}`}>
      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.id}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ADTable;
