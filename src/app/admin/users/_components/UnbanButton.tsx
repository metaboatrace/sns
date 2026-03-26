'use client';

import { useState } from 'react';

import { unbanUser } from '../_actions/unbanUser';

export function UnbanButton({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUnban() {
    setIsPending(true);
    setError(null);

    const result = await unbanUser(userId);

    if ('error' in result) {
      setError(result.error);
      setIsPending(false);
    } else {
      setIsOpen(false);
      setIsPending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-3 py-1 text-xs font-medium rounded bg-green-600 text-white hover:bg-green-700 transition-colors"
      >
        BAN解除
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">BAN解除</h3>

            <p className="text-sm text-muted-foreground mb-4">
              このユーザーのBANを解除しますか？解除するとプラットフォームへのフルアクセスが復元されます。
            </p>

            {error && <p className="text-destructive text-sm mt-2">{error}</p>}

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setError(null);
                }}
                className="px-4 py-2 text-sm rounded bg-card border border-border text-foreground hover:bg-secondary transition-colors"
                disabled={isPending}
              >
                キャンセル
              </button>
              <button
                type="button"
                onClick={handleUnban}
                className="px-4 py-2 text-sm rounded bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50"
                disabled={isPending}
              >
                {isPending ? '処理中...' : 'BAN解除を実行'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
