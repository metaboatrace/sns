type TruncatedTextProps = {
  text: string | null | undefined;
  maxLength: number;
  className?: string;
};

/**
 * Display text truncated to a maximum length with the full text in a title tooltip.
 * Shows "-" when the text is empty or absent.
 */
export function TruncatedText({ text, maxLength, className }: TruncatedTextProps) {
  if (!text) {
    return <span className="text-muted-foreground">-</span>;
  }

  const truncated = text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return (
    <span title={text} className={className}>
      {truncated}
    </span>
  );
}
