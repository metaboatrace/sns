import Table from '@/features/admin/raw-data/components/Table';
import { RaceTableSkeleton } from '@/features/admin/raw-data/components/skeltons';
import { Suspense } from 'react';
import Pagination from '@/features/admin/raw-data/components/pagination';
import { DEFAULT_ITEMS_PER_PAGE } from '@/constants';
import { getRaceCount } from '@/lib/api/graphql/race';

const ITEMS_PER_PAGE = DEFAULT_ITEMS_PER_PAGE;

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const countData = await getRaceCount();
  const totalCount = countData.races_aggregate.aggregate.count;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">レース一覧</h1>
      </div>
      <Suspense fallback={<RaceTableSkeleton />}>
        <Table query={query} currentPage={currentPage} limit={ITEMS_PER_PAGE} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
