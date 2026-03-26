type Props = {
    message: string;
    className?: string;
};

export function FormErrorMessage({ message, className = '' }: Props) {
    return (
        <div className={`p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg text-center ${className}`.trim()}>
            <p className="text-sm text-red-600 dark:text-red-400">{message}</p>
        </div>
    );
}
