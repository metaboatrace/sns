'use client';

import { useRef, useState } from 'react';

import { banUser } from '../_actions/banUser';

export function BanButton({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reasonRef = useRef<HTMLTextAreaElement>(null);

  async function handleBan() {
    const reason = reasonRef.current?.value.trim();
    if (!reason) {
      setError('理由を入力してください');
      return;
    }

    setIsPending(true);
    setError(null);

    const result = await banUser(userId, reason);

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
        className="px-3 py-1 text-xs font-medium rounded bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
      >
        BAN
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">ユーザーをBANする</h3>

            <label htmlFor={`ban-reason-${userId}`} className="block text-sm font-medium text-foreground mb-2">
              BAN理由
            </label>
            <textarea
              id={`ban-reason-${userId}`}
              ref={reasonRef}
              className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground resize-none"
              rows={3}
              maxLength={1000}
              placeholder="BANの理由を入力してください..."
            />

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
                onClick={handleBan}
                className="px-4 py-2 text-sm rounded bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors disabled:opacity-50"
                disabled={isPending}
              >
                {isPending ? '処理中...' : 'BANを実行'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
