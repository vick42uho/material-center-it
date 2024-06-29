import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';


const statusMap = {
  ใช้งาน: { label: 'ใช้งาน', color: 'success' },
  อยู่ระหว่างพัฒนา: { label: 'อยู่ระหว่างพัฒนา', color: 'warning' },
  ช่วงทดสอบ: { label: 'ช่วงทดสอบ', color: 'info' },
  ไม่ใช้งาน: { label: 'ไม่ใช้งาน', color: 'error' },
};

export default function UserTableRow({
  id_program,
  selected,
  name,
  manual,
  status,
  url,
  details,
  imgUrl,
  nameDev,
  handleClick,
  onDeleteSuccess,
}) {
  const [menuOpen, setMenuOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setMenuOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuOpen(null);
  };

  const { label: statusLabel, color: statusColor } = statusMap[status] || { label: 'ไม่ทราบ', color: 'default' };

  const handleDelete = () => {
    if (!window.confirm(`ยันยันการลบ "${name}"?`)) {
      return;
    }

    fetch(`http://18.143.102.26:9999/program/delete/?program_ids=${id_program}`, {
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
    <>
      <TableRow hover role="checkbox" tabIndex={-1} selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={imgUrl || undefined}>
              {!imgUrl && name[0]}
            </Avatar>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>
          {manual ? (
            <Typography component="a" href={manual} target="_blank" rel="noopener noreferrer">
              เปิดคู่มือ
            </Typography>
          ) : (
            'ไม่มีคู่มือ'
          )}
        </TableCell>
        <TableCell>
          <Label color={statusColor}>{statusLabel}</Label>
        </TableCell>
        <TableCell>
          {url ? (
            <Typography component="a" href={url} target="_blank" rel="noopener noreferrer">
              เปิดโปรแกรม
            </Typography>
          ) : (
            'ไม่มีโปรแกรม'
          )}
        </TableCell>
        <TableCell>{details}</TableCell>
        <TableCell>{nameDev}</TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!menuOpen}
        anchorEl={menuOpen}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { width: 140 } }}
      >
        <Link to={`/program/update/${id_program}`} style={{ textDecoration: 'none' }}>
        <MenuItem 
        sx={{ color: 'primary.main' }}>
        <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        </Link>
        <MenuItem onClick={() => handleDelete(id_program)} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  id_program: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  manual: PropTypes.string,
  status: PropTypes.string.isRequired,
  url: PropTypes.string,
  details: PropTypes.string,
  imgUrl: PropTypes.string,
  nameDev: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  onDeleteSuccess: PropTypes.func,
};

