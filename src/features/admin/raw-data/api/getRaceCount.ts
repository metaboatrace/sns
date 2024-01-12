import {
  getRaceCount as getRaceCountFromGql,
  getRaceCountByDate,
} from '@/lib/api/graphql/race';

export default async function getRaceCount(
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
