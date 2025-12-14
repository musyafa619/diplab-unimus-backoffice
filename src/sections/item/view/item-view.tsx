import type { ItemListResponse } from 'src/types/Item';

import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { _users } from 'src/_mock';
import { getItems } from 'src/api/services/items';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { emptyRows } from '../utils';
import { TableNoData } from '../table-no-data';
import { ItemTableRow } from '../item-table-row';
import { ItemTableHead } from '../item-table-head';
import CreateItemDialog from '../item-form-dialog';
import { TableEmptyRows } from '../table-empty-rows';
import { ItemTableToolbar } from '../item-table-toolbar';

export function ItemView() {
  const table = useTable();

  const [itemList, setItemList] = useState<ItemListResponse>({
    data: [],
    meta: {
      page: 1,
      limit: 5,
      total: 0,
      totalPages: 0,
    },
  });

  const fetchItems = useCallback(async () => {
    const res: ItemListResponse = await getItems({
      page: table.page,
      limit: table.limit,
      search: table.searchKeyword || undefined,
      orderBy: table.orderBy,
      sortBy: table.sortBy,
    });

    setItemList(res);
  }, [table.page, table.limit, table.searchKeyword, table.orderBy, table.sortBy]);

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Alat
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => setDialogOpen(true)}
        >
          Tambah Alat
        </Button>

        <CreateItemDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onCreated={(created) => console.log('created', created)}
        />
      </Box>

      <Card>
        <ItemTableToolbar
          onSearchKeyword={(keyword: string) => {
            table.onSearchKeyword(keyword);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ItemTableHead
                sortBy={table.sortBy}
                orderBy={table.orderBy}
                rowCount={itemList?.data?.length}
                onSort={table.onSort}
                headLabel={[
                  { id: 'name', label: 'Nama' },
                  { id: 'quantity', label: 'Jumlah' },
                  { id: 'updatedAt', label: 'Terakhir Diupdate' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {itemList?.data
                  ?.slice(table.page * table.limit, table.page * table.limit + table.limit)
                  .map((row) => <ItemTableRow key={row?.id} row={row} />)}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.limit, _users.length)}
                />

                {itemList?.data?.length < 1 && <TableNoData searchQuery={table.searchKeyword} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={_users.length}
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
  const [page, setPage] = useState(0);
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
    setPage(0);
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
