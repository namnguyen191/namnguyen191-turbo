import { TextInput } from '@carbon/react/lib/components/TextInput';
import { type ReactElement, useCallback, useEffect, useMemo, useState } from 'react';

import { CarbonTable } from '../../shared/components/carbon-table/CarbonTable';
import {
  createTableColumns,
  type TableModel,
} from '../../shared/components/carbon-table/CarbonTable.interface';
import {
  generateMockUserCreditCardData,
  type MockUserCreditCardData,
} from '../../shared/utils/mock-data';
import styles from './UserCreditTable.module.scss';

const mockUserCreditCardData = generateMockUserCreditCardData(10);

const dateFormatter = new Intl.DateTimeFormat('en-CA', {
  dateStyle: 'full',
  timeStyle: 'long',
  timeZone: 'America/Toronto',
});
const formatISODate = (isoString: string): string => dateFormatter.format(new Date(isoString));

type EditableCellProps<T extends number | string> = {
  onFinishedEdit?: (val: T) => void;
  initialVal: T;
};
const EditableCell = <T extends number | string>(props: EditableCellProps<T>): ReactElement => {
  const { onFinishedEdit, initialVal } = props;

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [val, setVal] = useState<T>(initialVal);
  const setNewVal = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const val = e.target.value;

      if (typeof initialVal === 'number') {
        setVal(parseFloat(val) as T);
        return;
      }

      setVal(val as T);
    },
    [initialVal]
  );

  return (
    <div className={styles['editable-field']}>
      {isEditMode ? (
        <TextInput
          onBlur={() => {
            setIsEditMode(false);
            if (onFinishedEdit) {
              onFinishedEdit(val);
            }
          }}
          autoFocus
          defaultValue={val}
          id=""
          labelText=""
          onChange={setNewVal}
        />
      ) : (
        <>
          <span onClick={() => setIsEditMode(true)} className={styles['back-drop']}></span>
          <span onClick={() => setIsEditMode(true)} className={styles['read-mode']}>
            {val}
          </span>
        </>
      )}
    </div>
  );
};

export const UserCreditTable = (): ReactElement => {
  const [tableData, setTableData] = useState<MockUserCreditCardData[]>(mockUserCreditCardData);

  useEffect(() => {
    console.log(`Nam data is: table data changed`);
  }, [tableData]);

  const updateDataCell = useCallback(
    <T extends keyof MockUserCreditCardData>(
      val: MockUserCreditCardData[T],
      rowIndex: number,
      colId: T
    ): void => {
      const existingVal = tableData[rowIndex]?.[colId];
      if (!existingVal || existingVal === val) {
        return;
      }

      setTableData((prev) =>
        prev.map((row, index) => {
          if (index !== rowIndex) {
            return row;
          }

          return {
            ...row,
            [colId]: val,
          };
        })
      );
    },
    [tableData]
  );

  const tableModel: TableModel<MockUserCreditCardData> = useMemo(
    () => ({
      columns: createTableColumns([
        {
          id: 'id',
          header: 'ID',
        },
        {
          id: 'firstName',
          header: 'First name',
        },
        {
          id: 'lastName',
          header: 'Last name',
        },
        {
          id: 'outstandingAmount',
          header: 'Outstanding amount',
          customCell: (val, rowIndex) =>
            EditableCell({
              initialVal: val,
              onFinishedEdit: (val) => updateDataCell(val, rowIndex, 'outstandingAmount'),
            }),
        },
        {
          id: 'upCommingDueDate',
          header: 'Due date',
          resizeable: true,
          customCell: (val): ReactElement => {
            const dueDate = val as MockUserCreditCardData['upCommingDueDate'];
            return <>{formatISODate(dueDate)}</>;
          },
        },
        {
          id: 'mostRecentMissedPaymentDate',
          header: 'Recent missed payment',
          resizeable: true,
          customCell: (val): ReactElement => {
            const recentMissedPaymentDate =
              val as MockUserCreditCardData['mostRecentMissedPaymentDate'];
            return (
              <>{recentMissedPaymentDate ? formatISODate(recentMissedPaymentDate) : 'Never'}</>
            );
          },
        },
      ]),
    }),
    [updateDataCell]
  );

  return (
    <>
      <CarbonTable tableModel={tableModel} data={tableData} />
    </>
  );
};
