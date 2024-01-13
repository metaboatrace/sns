import { RaceList } from './tables';
import { RaceTableSkeleton } from './skeltons';
import { Suspense } from 'react';
import Pagination from './pagination';
import Search from './search';
import { DEFAULT_ITEMS_PER_PAGE } from '@/constants';
import { getRaceCount } from '@/features/admin/raw-data/races/api';

const ITEMS_PER_PAGE = DEFAULT_ITEMS_PER_PAGE;

export default async function Container({
  page,
  date,
  stadiumTelCode,
}: {
  page: string | undefined;
  date: string | undefined;
  stadiumTelCode: string | undefined;
}) {
  const currentPage = Number(page) || 1;

  const totalCount = await getRaceCount(date, stadiumTelCode);
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
        <RaceList
          date={date}
          stadiumTelCode={stadiumTelCode}
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
