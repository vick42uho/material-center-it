import PropTypes from 'prop-types';

import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

export default function UserTableToolbar({ selectedIds, filterName, onFilterName, onDeleteSuccess }) {
  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to delete the selected programs?')) {
      return;
    }

    if (selectedIds.length === 0) {
      return;
    }

    const queryParams = selectedIds.map(id => `program_ids=${id}`).join('&');

    fetch(`http://3.1.6.34/program/delete/?${queryParams}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete programs');
        }
        return response.json();
      })
      .then(data => {
        console.log('Programs deleted successfully:', data);
        // เรียก onDeleteSuccess หลังจากลบเสร็จสมบูรณ์
        if (onDeleteSuccess) onDeleteSuccess();
      })
      .catch(error => {
        console.error('Error deleting programs:', error);
      });
  };

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(selectedIds.length > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {selectedIds.length > 0 ? (
        <Typography component="div" variant="subtitle1">
          {selectedIds.length} selected
        </Typography>
      ) : (
        <OutlinedInput
          value={filterName}
          onChange={onFilterName}
          placeholder="Search program..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
          sx={{ width: 240 }}
        />
      )}

      {selectedIds.length > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  selectedIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func.isRequired,
  onDeleteSuccess: PropTypes.func,
};
