import { UserCreditTable } from './components/user-credit-table/UserCreditTable';

export const App: React.FC = () => {
  // const updateTableData = useCallback(
  //   (
  //     e: React.ChangeEvent<HTMLInputElement>,
  //     rowIndex: number,
  //     columnId: keyof MockUserCreditCardData
  //   ): void => {
  //     let newValue: MockUserCreditCardDataValue = e.target.value;
  //     if (columnId === 'outstandingAmount') {
  //       newValue = parseFloat(newValue);
  //     }

  //     if (newValue === 'Never') {
  //       newValue = null;
  //     }

  //     (table.options.meta as TableMeta).updateData(rowIndex, columnId, newValue);
  //   },
  //   [table]
  // );
  // const tableMeta = useMemo<TableMeta>(
  //   () => ({
  //     updateData: (
  //       rowIndexToUpdate: number,
  //       columnId: keyof MockUserCreditCardData,
  //       newValue: MockUserCreditCardDataValue
  //     ): void => {
  //       const currentDataVal = data[rowIndexToUpdate]?.[columnId];

  //       if (!currentDataVal || currentDataVal === newValue) {
  //         return;
  //       }

  //       setData((prev) =>
  //         prev.map((record, rowIndex) => {
  //           if (rowIndex !== rowIndexToUpdate) {
  //             return record;
  //           }

  //           return {
  //             ...record,
  //             [columnId]: newValue,
  //           };
  //         })
  //       );
  //     },
  //   }),
  //   [setData, data]
  // );
  return (
    <>
      <UserCreditTable />
    </>
  );
};
