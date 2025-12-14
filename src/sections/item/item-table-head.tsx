import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

import { visuallyHidden } from './utils';

// ----------------------------------------------------------------------

type ItemTableHeadProps = {
  orderBy: 'asc' | 'desc';
  rowCount: number;
  sortBy: string;
  onSort: (id: string) => void;
  headLabel: Record<string, any>[];
};

export function ItemTableHead({
  sortBy,
  onSort,
  orderBy,
  rowCount,
  headLabel,
}: ItemTableHeadProps) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sortDirection={sortBy === headCell.id ? orderBy : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            <TableSortLabel
              active={sortBy === headCell.id}
              direction={sortBy === headCell.id ? orderBy : 'asc'}
              onClick={() => onSort(headCell.id)}
            >
              {headCell.label}
              {sortBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {orderBy === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
