type BadgeVariant = 'default' | 'primary' | 'destructive' | 'secondary' | 'muted';

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-secondary text-secondary-foreground',
  primary: 'bg-primary text-primary-foreground',
  destructive: 'bg-destructive text-destructive-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  muted: 'bg-muted text-muted-foreground',
};

type BadgeProps = {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
};

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  const base = 'inline-block px-2 py-0.5 rounded text-xs font-medium';
  const colors = variantClasses[variant];
  const combined = className ? `${base} ${colors} ${className}` : `${base} ${colors}`;

  return <span className={combined}>{children}</span>;
}
