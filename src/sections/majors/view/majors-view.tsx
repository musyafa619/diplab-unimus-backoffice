import type { MajorListResponse } from 'src/types/major';

import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { DashboardContent } from 'src/layouts/dashboard';
import { getMajors, deleteMajor } from 'src/api/services/majors';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableNoData } from 'src/components/table-no-data';
import { useConfirm } from 'src/components/confirmation-dialog/confirm-context';

import { TableRow } from '../components/table-row';
import { TableHead } from '../components/table-head';
import { FormDialog } from '../components/form-dialog';
import { TableToolbar } from '../components/table-toolbar';

export function MajorView() {
  const table = useTable();
  const [isLoading, setIsLoading] = useState(false);
  const confirm = useConfirm();

  const [majorList, setMajorList] = useState<MajorListResponse>({
    data: [],
    meta: {
      page: 1,
      limit: 5,
      total: 0,
      totalPages: 0,
    },
  });

  const [selectedMajorId, setSelectedMajorId] = useState<string | undefined>();

  const selectedMajor = useMemo(() => {
    if (!selectedMajorId) {
      return null;
    }
    return majorList.data.find((major) => major.id === selectedMajorId);
  }, [selectedMajorId, majorList.data]);

  const fetchMajor = useCallback(async () => {
    setIsLoading(true);
    const res: MajorListResponse = await getMajors({
      page: table.page,
      limit: table.limit,
      search: table.searchKeyword || undefined,
      orderBy: table.orderBy,
      sortBy: table.sortBy,
    });

    setMajorList(res);
    setIsLoading(false);
  }, [table.page, table.limit, table.searchKeyword, table.orderBy, table.sortBy]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDeleteMajor = async (id: string) => {
    const confirmDelete = await confirm({
      title: 'Hapus major?',
      description: 'Major ini akan dihapus permanen. Lanjutkan?',
    });

    if (confirmDelete) {
      await deleteMajor(id);
      await fetchMajor();
    }
  };

  useEffect(() => {
    fetchMajor();
  }, [fetchMajor, table.page, table.limit, table.searchKeyword, table.orderBy, table.sortBy]);

  useEffect(() => {
    if (!dialogOpen) {
      setSelectedMajorId(undefined);
    }
  }, [dialogOpen]);

  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          alignMajor: 'center',
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Jurusan
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => setDialogOpen(true)}
        >
          Tambah Jurusan
        </Button>
      </Box>

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
                  rowCount={majorList?.data?.length}
                  onSort={table.onSort}
                  headLabel={[
                    { id: 'name', label: 'Nama' },
                    { id: 'updatedAt', label: 'Terakhir Diupdate' },
                    { id: '' },
                  ]}
                />

                <TableBody style={{ width: '100%' }}>
                  {majorList?.data.map((row) => (
                    <TableRow
                      key={row?.id}
                      row={row}
                      onEditRow={(id) => {
                        setSelectedMajorId(id);
                        setDialogOpen(true);
                      }}
                      onDeleteRow={handleDeleteMajor}
                    />
                  ))}

                  {majorList?.data?.length < 1 && <TableNoData searchQuery={table.searchKeyword} />}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page - 1}
          count={majorList?.meta?.total || 0}
          rowsPerPage={table.limit}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeLimit}
        />
      </Card>
      <FormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onFinish={() => fetchMajor()}
        initialData={selectedMajor}
      />
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
    console.log('zzz', newPage);
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

  console.log(page);

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
