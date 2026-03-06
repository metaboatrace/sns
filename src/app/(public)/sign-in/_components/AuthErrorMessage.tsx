export function AuthErrorMessage() {
  return (
    <div className="max-w-sm mx-auto mb-4 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg text-center">
      <p className="text-sm text-red-600 dark:text-red-400">
        認証中にエラーが発生しました。もう一度お試しください。
      </p>
    </div>
  );
}
