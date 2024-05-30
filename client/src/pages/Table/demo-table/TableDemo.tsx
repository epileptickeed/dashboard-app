// import { useState } from 'react';
// import Paper from '@mui/material/Paper';
// import { EditingState } from '@devexpress/dx-react-grid';
// import {
//   Grid,
//   Table,
//   TableHeaderRow,
//   TableEditRow,
//   TableEditColumn,
// } from '@devexpress/dx-react-grid-material-ui';

// import { generateRows, defaultNestedColumnValues } from './generator';

// const getRowId = (row) => row.id;

// export default () => {
//   const [columns] = useState([
//     {
//       name: 'Тип',
//       title: 'Тип',
//       getCellValue: (row) => (row.user ? row.user.firstName : undefined),
//     },
//     {
//       name: 'Категория',
//       title: 'Категория',
//       getCellValue: (row) => (row.user ? row.user.lastName : undefined),
//     },
//     {
//       name: 'Описание',
//       title: 'Описание',
//       getCellValue: (row) => (row.car ? row.car.model : undefined),
//     },
//     {
//       name: 'Сумма',
//       title: 'Сумма',
//       getCellValue: (row) => (row.car ? row.car.model : undefined),
//     },
//   ]);
//   const [rows, setRows] = useState(
//     generateRows({
//       columnValues: { id: ({ index }) => index, ...defaultNestedColumnValues },
//       length: 8,
//     }),
//   );
//   const [editingColumnExtensions] = useState([
//     {
//       columnName: 'firstName',
//       createRowChange: (row, value) => ({ user: { ...row.user, firstName: value } }),
//     },
//     {
//       columnName: 'lastName',
//       createRowChange: (row, value) => ({ user: { ...row.user, lastName: value } }),
//     },
//     // {
//     //   columnName: 'car',
//     //   createRowChange: (row, value) => ({ car: { model: value } }),
//     // },
//   ]);

//   const commitChanges = ({ added, changed, deleted }) => {
//     let changedRows;
//     if (added) {
//       const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
//       changedRows = [
//         ...rows,
//         ...added.map((row, index) => ({
//           id: startingAddedId + index,
//           ...row,
//         })),
//       ];
//     }
//     if (changed) {
//       changedRows = rows.map((row) => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
//     }
//     if (deleted) {
//       const deletedSet = new Set(deleted);
//       changedRows = rows.filter((row) => !deletedSet.has(row.id));
//     }
//     setRows(changedRows);
//   };

//   return (
//     <Paper>
//       <Grid rows={rows} columns={columns} getRowId={getRowId}>
//         <EditingState columnExtensions={editingColumnExtensions} onCommitChanges={commitChanges} />
//         <Table />
//         <TableHeaderRow />
//         <TableEditRow />
//         <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
//       </Grid>
//     </Paper>
//   );
// };
