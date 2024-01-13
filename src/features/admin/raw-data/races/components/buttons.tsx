import { PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function EditButton({ id }: { id: string }) {
  return (
    <Link
      href={`/admin/raw-data`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}
