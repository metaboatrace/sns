import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getLatestDate, getRacesByDate, getStadiums } from "@/lib/graphql/queries/races";
import { RaceList } from "@/components/races/race-list";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("races");
  return {
    title: t("title") + " | METABOATRACE",
    description: t("metaDescription"),
  };
}

export default async function RacesPage() {
  const t = await getTranslations("races");
  const latestDate = await getLatestDate();

  if (!latestDate) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("noData")}</p>
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
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <span className="text-sm text-muted-foreground">{latestDate}</span>
      </div>
      <RaceList races={races} stadiums={stadiums} date={latestDate} />
    </div>
  );
}
