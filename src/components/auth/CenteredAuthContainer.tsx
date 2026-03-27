type Props = {
  title: string;
  children: React.ReactNode;
};

export function CenteredAuthContainer({ title, children }: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-sm px-6">
        <h1 className="text-2xl font-semibold text-center text-foreground mb-8">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}
