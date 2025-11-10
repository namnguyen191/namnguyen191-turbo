import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { type ReactElement, useCallback, useMemo } from 'react';

import type { ObjectValue } from '../../utils/types-helper';
import type { CarbonTableProps, TableRowData } from './CarbonTable.interface';
import styles from './CarbonTable.module.scss';

export const CarbonTable = <T extends TableRowData>(props: CarbonTableProps<T>): ReactElement => {
  const { tableModel, data } = props;

  const { columns } = tableModel;

  const columnsDef: ColumnDef<T, ObjectValue<T>>[] = useMemo(() => {
    return columns.map((col) => ({
      accessorKey: col.id,
      header: col.header,
      enableResizing: col.resizeable,
      cell: ({ getValue, row }): ReactElement => {
        const val = getValue();

        if (col.customCell) {
          return col.customCell(val as ObjectValue<T>, row.index);
        }

        try {
          const displayVal = JSON.stringify(val);
          return <>{displayVal}</>;
        } catch (_err) {
          return (
            <span>
              Cannot display value for column "{col.header}" because its data value is not
              stringifiable
            </span>
          );
        }
      },
    }));
  }, [columns]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: columnsDef,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
  });

  const tableWrapperStyle = {
    '--table-total-width': table.getTotalSize() + 'px',
  } as React.CSSProperties;

  const getTableHeaderStyle = useCallback(
    (headerSize: number): React.CSSProperties =>
      ({
        '--header-width': headerSize + 'px',
      }) as React.CSSProperties,
    []
  );

  return (
    <div style={tableWrapperStyle} className={styles['table-wrapper']}>
      <Table>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableHead key={headerGroup.id}>
            <TableRow>
              {headerGroup.headers.map((header) => {
                const isResizable = header.getContext().column.columnDef.enableResizing;
                const resizeHandler = isResizable ? header.getResizeHandler() : undefined;
                return (
                  <TableHeader
                    className={`${styles['header']}`}
                    style={getTableHeaderStyle(header.getSize())}
                    key={header.id}
                    onMouseDown={resizeHandler}
                    onTouchStart={resizeHandler}
                  >
                    {header.getContext().column.columnDef.enableResizing ? (
                      <div
                        className={`${styles['resizer']} ${header.column.getIsResizing() ? styles['is-resizing'] : ''}`}
                      ></div>
                    ) : (
                      ''
                    )}
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHeader>
                );
              })}
            </TableRow>
          </TableHead>
        ))}

        <TableBody>
          {table.getRowModel().rows.map((row, rowIndex) => (
            <TableRow key={rowIndex.toString()}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
