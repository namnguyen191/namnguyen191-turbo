import type { ReactElement } from 'react';

export type TableRowData = Record<string, unknown>;
export type TableData<T extends TableRowData> = T[];
export type TableColumn<TRowData extends TableRowData, TKey extends keyof TRowData> = {
  id: TKey;
  header: string;
  resizeable?: boolean;
  customCell?: (val: TRowData[TKey], rowIndex: number) => ReactElement;
};
export const createTableColumns = <T extends TableRowData>(
  columns: {
    [K in keyof T]: TableColumn<T, K>;
  }[keyof T][]
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => columns;
export type TableModel<T extends TableRowData> = {
  columns: ReturnType<typeof createTableColumns<T>>;
};

export type CarbonTableProps<T extends TableRowData> = {
  tableModel: TableModel<T>;
  data: TableData<T>;
};
