import Link from 'next/link';
import { AuthStatusDisplay } from './AuthStatusDisplay';

export function Header() {
  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center gap-3">
              <span className="text-xl font-bold text-foreground">
                Boatrace SNS
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <AuthStatusDisplay />
          </div>
        </div>
      </div>
    </header>
  );
}
