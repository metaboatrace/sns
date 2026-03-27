import { cn } from '@/lib/utils';

type Props = {
  message: string;
  className?: string;
};

export function FormErrorMessage({ message, className }: Props) {
  return (
    <div className={cn('p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-center', className)}>
      <p className="text-sm text-destructive">{message}</p>
    </div>
  );
}
