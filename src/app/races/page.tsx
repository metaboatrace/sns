import type { Metadata } from "next";
import { getLatestDate, getRacesByDate, getStadiums } from "@/lib/graphql/queries/races";
import { RaceList } from "@/components/races/race-list";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "レース一覧 | METABOATRACE",
  description: "最新のボートレース一覧を表示します。各場ごとのレース情報、締切時間、状態を確認できます。",
};

export default async function RacesPage() {
  const latestDate = await getLatestDate();

  if (!latestDate) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">レース一覧</h1>
        <p className="text-muted-foreground">レースデータが見つかりません。</p>
      </div>
    );
  }

  const [races, stadiums] = await Promise.all([
    getRacesByDate(latestDate),
    getStadiums(),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">レース一覧</h1>
        <span className="text-sm text-muted-foreground">{latestDate}</span>
      </div>
      <RaceList races={races} stadiums={stadiums} date={latestDate} />
    </div>
  );
}
