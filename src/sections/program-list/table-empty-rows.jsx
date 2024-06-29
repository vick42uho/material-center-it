import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default function TableEmptyRows({ emptyRows, height }) {
  if (!emptyRows) {
    return null;
  }

  return (
    <TableRow style={{ height: height * emptyRows }}>
      <TableCell colSpan={7} />
    </TableRow>
  );
}

TableEmptyRows.propTypes = {
  emptyRows: PropTypes.number,
  height: PropTypes.number,
};
