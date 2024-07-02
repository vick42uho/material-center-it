import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import LinearProgress from '@mui/material/LinearProgress';
import TablePagination from '@mui/material/TablePagination';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import './program-list.css';
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function ProgramPageList() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name_program');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
<<<<<<< HEAD
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/program`);
      // const response = await axios.get('process.env.API_URL/program');
=======
      const response = await axios.get('http://54.179.56.107:9999/program');
>>>>>>> 58492271a2637d306fd95d4987551d8109335b0f
      setPrograms(response.data);
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = programs.map((n) => n.id_program);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, id_program) => {
    const selectedIndex = selected.indexOf(id_program);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = [...selected, id_program];
    } else if (selectedIndex === 0) {
      newSelected = selected.slice(1);
    } else if (selectedIndex === selected.length - 1) {
      newSelected = selected.slice(0, -1);
    } else if (selectedIndex > 0) {
      newSelected = [
        ...selected.slice(0, selectedIndex),
        ...selected.slice(selectedIndex + 1),
      ];
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
    setPage(0);
  };

  const handleDeleteSuccess = () => {
    fetchPrograms(); // รีเฟรชข้อมูลหลังจากการลบสำเร็จ
    setSelected([]); // ล้าง ID ที่เลือก
  };

  const dataFiltered = applyFilter({
    inputData: programs,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">โปรแกรมทั้งหมด</Typography>
        <Button
          variant="contained"
          color="inherit"
          component={Link}
          to="/program/add" // ลิงค์ไปยัง ProgramAddPage
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          เพิ่มโปรแกรม
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          selectedIds={selected}
          filterName={filterName}
          onFilterName={handleFilterByName}
          onDeleteSuccess={handleDeleteSuccess}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            {loading && <Typography><LinearProgress /></Typography>}
            {error && <Typography>Error: {error}</Typography>}
            {!loading && !error && (
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={programs.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'name_program', label: 'ชื่อโปรแกรม' },
                    { id: 'manual_program', label: 'คู่มือ' },
                    { id: 'status_program', label: 'สถานะ' },
                    { id: 'url_program', label: 'URL' },
                    { id: 'details_program', label: 'รายละเอียด' },
                    { id: 'name_dev', label: 'ผู้พัฒนา' },
                    { id: '', label: '' }, // Ensure there is an empty object here to match the expected structure
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <UserTableRow
                        key={row.id_program}
                        id_program={Number(row.id_program)} // Convert id_program to number
                        name={row.name_program}
                        manual={row.manual_program}
                        status={row.status_program}
                        url={row.url_program}
                        details={row.details_program.slice(0, 30)}
                        imgUrl={row.img_program}
                        nameDev={row.name_dev}
                        selected={selected.indexOf(row.id_program) !== -1}
                        handleClick={(event) => handleClick(event, row.id_program)}
                        onDeleteSuccess={handleDeleteSuccess} // ส่งฟังก์ชันไปยัง UserTableRow
                      />
                    ))}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, programs.length)}
                  />

                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={programs.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
