'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { LogOut, Settings, UserIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function AuthStatusDisplay() {
    const { user, isLoading, signOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleMouseDown(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleMouseDown);
        return () => document.removeEventListener('mousedown', handleMouseDown);
    }, []);

    if (isLoading) {
        return null;
    }

    if (user) {
        return (
            <div ref={containerRef} className="relative flex items-center h-full">
                <button
                    type="button"
                    className="flex items-center justify-center rounded-full border-2 border-primary text-primary hover:bg-primary/10 transition-colors p-[2px]"
                    aria-label="アカウントメニュー"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    <UserIcon className="h-5 w-5" />
                </button>

                {isOpen && (
                    <div className="fixed top-16 right-0 w-48 border-l border-b border-border bg-card shadow-lg z-50">
                        <div className="py-1">
                            <Link
                                href="/preferences"
                                className="flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-accent transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <Settings className="h-4 w-4" />
                                設定
                            </Link>
                            <button
                                type="button"
                                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-accent transition-colors text-left"
                                onClick={() => {
                                    setIsOpen(false);
                                    signOut();
                                }}
                            >
                                <LogOut className="h-4 w-4" />
                                ログアウト
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <Link
            href="/sign-in"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
            ログイン
        </Link>
    );
}
