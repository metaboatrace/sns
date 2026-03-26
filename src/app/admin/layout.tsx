import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getOptionalUser } from '@/lib/auth';
import { isAdmin } from '@/lib/db/queries/user-roles';

import { getLabel } from './_lib/labels';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getOptionalUser();

  if (!user) {
    notFound();
  }

  if (!(await isAdmin(user.id))) {
    notFound();
  }

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 bg-secondary border-r border-border">
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/admin"
                className="flex items-center p-2 text-foreground rounded-lg hover:bg-background"
              >
                <span className="ml-3">{getLabel('admin.dashboard')}</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/users"
                className="flex items-center p-2 text-foreground rounded-lg hover:bg-background"
              >
                <span className="ml-3">{getLabel('admin.users')}</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/audit-log"
                className="flex items-center p-2 text-foreground rounded-lg hover:bg-background"
              >
                <span className="ml-3">{getLabel('admin.auditLog')}</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/activity-log"
                className="flex items-center p-2 text-foreground rounded-lg hover:bg-background"
              >
                <span className="ml-3">{getLabel('admin.activityLog')}</span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="flex items-center p-2 text-foreground rounded-lg hover:bg-background"
              >
                <span className="ml-3">{getLabel('admin.backToSite')}</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto w-full p-8 bg-background text-foreground">
        {children}
      </main>
    </div>
  );
}
