import axios from 'axios';
import toast from 'react-hot-toast';
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
import { generateRows } from './generator';

// здесь много any потому что я не нашёл тайскрипт версию ;(
// а так я вообще норм тип any избегаю ))

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
  localDate?: string;
};

const TableMain = ({ expenses }: Expenses) => {
  // console.log(expenses?.map((item) => item.date));

  const columns = [
    { name: 'type', title: 'Тип' },
    { name: 'category', title: 'Категория' },
    { name: 'desc', title: 'Описание' },
    { name: 'sum', title: 'Сумма' },
    { name: 'date', title: 'Дата' },
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

  const commitChanges = ({ changed, deleted }: any) => {
    if (changed) {
      console.log(changed);
      console.log('changed'); //<-- не возвращает ничего, ПОЧ?!
    }

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

  const [sorting, setSorting] = useState<any>([{ direction: 'asc' }]);

  return (
    <>
      {expenses && (
        <Paper>
          <Grid rows={rows} columns={columns}>
            <SelectionState selection={selection} onSelectionChange={setSelection} />
            <PagingState defaultCurrentPage={0} pageSize={6} />
            <SortingState sorting={sorting} onSortingChange={setSorting} />
            <EditingState onCommitChanges={commitChanges} />
            <IntegratedSelection />
            <IntegratedPaging />
            <IntegratedSorting />

            <Table />
            <TableHeaderRow showSortingControls />
            <TableEditColumn
              //  showEditCommand
              showDeleteCommand
            />
            <TableSelection showSelectAll />
            <PagingPanel />
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default TableMain;
