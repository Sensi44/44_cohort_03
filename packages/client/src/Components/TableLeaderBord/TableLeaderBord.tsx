import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

type TableLeaderBord = {
  rows: any[];
};
export const TableLeaderBord = ({ rows }: TableLeaderBord) => {
  return (
    <TableContainer
      sx={{
        marginTop: 2,
      }}
      component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell width={20}>Место</TableCell>
            <TableCell align='center'>Имя</TableCell>
            <TableCell align='right'>Счет</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell width={30} component='th' scope='row'>
                {index + 1}
              </TableCell>
              <TableCell align='center'>{row.name}</TableCell>
              <TableCell width={30} align='right'>
                {row.score}
              </TableCell>
            </TableRow>
          ))}
          {!rows.length && (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell width={30} component='th' scope='row'></TableCell>
              <TableCell align='center'>Тут пока никого нет.</TableCell>
              <TableCell width={30} align='right'></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
