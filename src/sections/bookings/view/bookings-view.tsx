import type { BookingListResponse } from 'src/types/booking';

import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import TabList from '@mui/lab/TabList';
import Table from '@mui/material/Table';
import TabContext from '@mui/lab/TabContext';
import TableBody from '@mui/material/TableBody';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { getBookings } from 'src/api/services/bookings';
import { DashboardContent } from 'src/layouts/dashboard';

import { Scrollbar } from 'src/components/scrollbar';

import { TableRow } from '../components/table-row';
import { TableHead } from '../components/table-head';
import { TableNoData } from '../components/table-no-data';
import { TableToolbar } from '../components/table-toolbar';

export function BookingView() {
  const table = useTable();
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState('all');

  const [bookingList, setBookingList] = useState<BookingListResponse>({
    data: [],
    meta: {
      page: 1,
      limit: 5,
      total: 0,
      totalPages: 0,
    },
  });

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    const res: BookingListResponse = await getBookings({
      page: table.page,
      limit: table.limit,
      search: table.searchKeyword || undefined,
      orderBy: table.orderBy,
      sortBy: table.sortBy,
      status: tab === 'all' ? undefined : tab,
    });

    setBookingList(res);
    setIsLoading(false);
  }, [table.page, table.limit, table.searchKeyword, table.orderBy, table.sortBy, tab]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems, table.page, table.limit, table.searchKeyword, table.orderBy, table.sortBy]);

  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Peminjaman
        </Typography>
      </Box>

      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 4 }}>
          <TabList onChange={(_, newValue) => setTab(newValue)} aria-label="lab API tabs example">
            <Tab label="Semua" value="all" />
            <Tab label="Pending" value="pending" />
            <Tab label="Berlangsung" value="approved" />
            <Tab label="Ditolak" value="rejected" />
            <Tab label="Selesai" value="finished" />
          </TabList>
        </Box>
      </TabContext>

      <Card>
        <TableToolbar
          onSearchKeyword={(keyword: string) => {
            table.onSearchKeyword(keyword);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          {isLoading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                minHeight: 300,
                alignItems: 'center',
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <TableHead
                  sortBy={table.sortBy}
                  orderBy={table.orderBy}
                  rowCount={bookingList?.data?.length}
                  onSort={table.onSort}
                  headLabel={[
                    { id: 'id', label: 'ID' },
                    { id: 'bookerName', label: 'Nama' },
                    { id: 'bookerEmail', label: 'Email' },
                    { id: 'quantity', label: 'Jumlah Barang' },
                    { id: 'status', label: 'Status' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {bookingList?.data.map((row) => <TableRow key={row?.id} row={row} />)}

                  {bookingList?.data?.length < 1 && (
                    <TableNoData searchQuery={table.searchKeyword} />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page - 1}
          count={bookingList?.meta?.total || 0}
          rowsPerPage={table.limit}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeLimit}
        />
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState<'asc' | 'desc'>('asc');
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState('name');
  const [searchKeyword, setSearchKeyword] = useState('');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = sortBy === id && orderBy === 'asc';
      setOrderBy(isAsc ? 'desc' : 'asc');
      setSortBy(id);
    },
    [sortBy, orderBy]
  );

  const onResetPage = useCallback(() => {
    setPage(1);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeLimit = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLimit(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  const onSearchKeyword = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  return {
    page,
    sortBy,
    onSort,
    orderBy,
    limit,
    onResetPage,
    onChangePage,
    onChangeLimit,
    searchKeyword,
    onSearchKeyword,
  };
}
