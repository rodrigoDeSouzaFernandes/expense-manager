import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

type TableSkeletonProps = {
  columns: number;
  rows?: number;
};

const TableSkeleton = ({ columns, rows = 5 }: TableSkeletonProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {Array.from({ length: columns }).map((_, idx) => (
            <TableCell key={idx}>
              <Skeleton variant="text" height={50} />
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <TableRow key={rowIdx}>
            {Array.from({ length: columns }).map((_, colIdx) => (
              <TableCell key={colIdx} sx={{ px: 2, py: 1.5 }}>
                <Skeleton variant="rectangular" height={25} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSkeleton;
