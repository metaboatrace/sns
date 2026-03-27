import Link from 'next/link';
import { notFound } from 'next/navigation';

import { requireAdmin } from './_lib/auth';
import { getLabel } from './_lib/labels';

const navItems = [
  { href: '/admin', labelKey: 'admin.dashboard' },
  { href: '/admin/users', labelKey: 'admin.users' },
  { href: '/admin/audit-log', labelKey: 'admin.auditLog' },
  { href: '/admin/activity-log', labelKey: 'admin.activityLog' },
  { href: '/', labelKey: 'admin.backToSite' },
] as const;

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await requireAdmin();
  if ('error' in auth) {
    notFound();
  }

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 bg-secondary border-r border-border">
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center p-2 text-foreground rounded-lg hover:bg-background"
                >
                  <span className="ml-3">{getLabel(item.labelKey)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto w-full p-8 bg-background text-foreground">
        {children}
      </main>
    </div>
  );
}
