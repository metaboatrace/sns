import { cn } from '@/lib/utils';

type DataTableCellProps = {
  children: React.ReactNode;
  /** Apply text-muted-foreground style (default: false) */
  muted?: boolean;
  className?: string;
};

/**
 * Standard table cell for AdminDataTable with consistent padding.
 */
export function DataTableCell({ children, muted = false, className }: DataTableCellProps) {
  return (
    <td className={cn('px-4 py-3', muted && 'text-muted-foreground', className)}>
      {children}
    </td>
  );
}
