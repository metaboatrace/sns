import Table from '@/features/admin/raw-data/components/Table';
import { RaceTableSkeleton } from '@/features/admin/raw-data/components/skeltons';
import { Suspense } from 'react';
import Pagination from '@/features/admin/raw-data/components/pagination';
import Search from '@/features/admin/raw-data/components/search';
import { DEFAULT_ITEMS_PER_PAGE } from '@/constants';
import getRaceCount from '@/features/admin/raw-data/api/getRaceCount';

const ITEMS_PER_PAGE = DEFAULT_ITEMS_PER_PAGE;

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    date?: string;
    stadium_tel_code?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;

  const totalCount = await getRaceCount(
    searchParams?.date,
    searchParams?.stadium_tel_code,
  );
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">レース一覧</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search />
      </div>
      <Suspense fallback={<RaceTableSkeleton />}>
        <Table
          date={searchParams?.date}
          stadiumTelCode={searchParams?.stadium_tel_code}
          currentPage={currentPage}
          limit={ITEMS_PER_PAGE}
        />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
