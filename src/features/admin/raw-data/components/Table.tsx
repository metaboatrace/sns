import { off } from 'process';
import { EditButton } from './buttons';
import { getRaces } from '@/lib/api/graphql/race';

export default async function RacesTable({
  query,
  currentPage,
  limit,
}: {
  query: string;
  currentPage: number;
  limit: number;
}) {
  const offset = (currentPage - 1) * limit;

  const races = await getRaces(offset, limit);

  return (
    <div className="6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg p-2 md:pt-0"></div>
        <table className="hidden min-w-full text-gray-900 md:table">
          <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-900">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-900">
                Stadium
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-900">
                Race Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-900">
                Title
              </th>
              <th scope="col" className="relative py-3 pl-6 pr-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {races &&
              races.map((race, index: number) => (
                <tr key={index} className="odd:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {race.date}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{`${race.stadium.tel_code}# ${race.stadium.name}`}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {race.race_number}R
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {race.title}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <EditButton id={String(index)} />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
