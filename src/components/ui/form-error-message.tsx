type Props = {
    message: string;
    className?: string;
};

export function FormErrorMessage({ message, className = '' }: Props) {
    return (
        <div className={`p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-center ${className}`.trim()}>
            <p className="text-sm text-destructive">{message}</p>
        </div>
    );
}
