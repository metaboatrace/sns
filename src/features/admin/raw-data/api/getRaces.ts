import {
  getRaces as getRacesFromGql,
  getRacesWithFilters,
  getRacesByDate,
} from '@/lib/api/graphql/race';

export default async function getRaces(
  offset: number,
  limit: number,
  date?: string,
  stadiumTelCode?: string | undefined,
) {
  let races;

  if (date) {
    races = stadiumTelCode
      ? await getRacesWithFilters(
          offset,
          limit,
          date,
          parseInt(stadiumTelCode, 10),
        )
      : await getRacesByDate(offset, limit, date);
  } else {
    races = await getRacesFromGql(offset, limit);
  }

  return races;
}
