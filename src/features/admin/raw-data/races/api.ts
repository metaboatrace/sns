import {
  getRaceCount as getRaceCountFromGql,
  getRaceCountByDate,
  getRaces as getRacesFromGql,
  getRacesWithFilters,
  getRacesByDate,
} from '@/lib/api/graphql/race';

export async function getRaceCount(
  date: string | undefined,
  stadiumTelCode?: string | undefined,
) {
  if (date) {
    if (stadiumTelCode) {
      // HACK: 今の機能要件的に日付指定しないと場コード指定できないのでこれで誤魔化す
      return 12;
    }
    const countData = await getRaceCountByDate(date);
    return countData.races_aggregate.aggregate.count;
  } else {
    const countData = await getRaceCountFromGql();
    return countData.races_aggregate.aggregate.count;
  }
}

export async function getRaces(
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
