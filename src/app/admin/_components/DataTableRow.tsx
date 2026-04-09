import { cn } from '@/lib/utils';

type DataTableRowProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Standard table row for AdminDataTable with consistent border styling.
 */
export function DataTableRow({ children, className }: DataTableRowProps) {
  return (
    <tr className={cn('border-t border-border', className)}>
      {children}
    </tr>
  );
}
