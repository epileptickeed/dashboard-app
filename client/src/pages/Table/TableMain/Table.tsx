import axios from 'axios';
import toast from 'react-hot-toast';
import debounce from 'lodash.debounce';
import Paper from '@mui/material/Paper';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditColumn,
  TableSelection,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import {
  SelectionState,
  PagingState,
  IntegratedPaging,
  IntegratedSelection,
} from '@devexpress/dx-react-grid';
import { userExpensesType } from '../../../redux/userDataSlice/slice';
import { EditingState } from '@devexpress/dx-react-grid';
import { SortingState, IntegratedSorting } from '@devexpress/dx-react-grid';
import { useEffect, useState } from 'react';
import { generateRows } from '../demo-table/generator';

type Expenses = {
  expenses: userExpensesType[];
};

type IRow = {
  type?: string;
  desc?: string;
  id?: string;
  sum?: number;
  category?: string;
  name?: string;
  title?: string;
};

const TableMain = ({ expenses }: Expenses) => {
  const columns = [
    { name: 'type', title: 'Тип' },
    { name: 'category', title: 'Категория' },
    { name: 'desc', title: 'Описание' },
    { name: 'sum', title: 'Сумма' },
  ];

  const [selection, setSelection] = useState<any[]>([]);
  const [rows, setRows] = useState<IRow[]>(
    generateRows({
      length: 8,
    }),
  );
  useEffect(() => {
    expenses === undefined ? false : setRows(expenses);
  }, [expenses]);

  const validate = (rows: any, columns: any) =>
    Object.entries(rows).reduce(
      (acc, [rowId, row]: any) => ({
        ...acc,
        [rowId]: columns.some((column: any) => column.required && row[column.name] === ''),
      }),
      {},
    );

  const commitChanges = ({ deleted }: any) => {
    if (deleted) {
      const clickedElement = [];
      clickedElement.push(rows[deleted]);
      const clickedElementId = clickedElement.map((item) => item.id);
      const requestId = clickedElementId.join('');

      const deleteExpense = async (id: string) => {
        try {
          const { data } = await axios.post(`/deleteExpense`, { id });
          console.log(data);
          if (data.error) {
            toast.error(data.error);
          } else {
            toast.success('Deleted!');
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        } catch (error) {
          console.error(error);
        }
      };
      deleteExpense(requestId);
    }
  };

  const [errors, setErrors] = useState({});
  const onEdited = debounce((edited) => setErrors(validate(edited, columns)), 250);
  const [sorting, setSorting] = useState<any>([{ direction: 'asc' }]);

  return (
    <>
      {expenses && (
        <Paper>
          <Grid rows={rows} columns={columns}>
            <SelectionState selection={selection} onSelectionChange={setSelection} />
            <PagingState defaultCurrentPage={0} pageSize={6} />
            <SortingState sorting={sorting} onSortingChange={setSorting} />
            <EditingState onRowChangesChange={onEdited} onCommitChanges={commitChanges} />
            <IntegratedSelection />
            <IntegratedPaging />
            <IntegratedSorting />

            <Table />
            <TableHeaderRow showSortingControls />
            <TableEditColumn showEditCommand showDeleteCommand />
            <TableSelection showSelectAll />
            <PagingPanel />
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default TableMain;
