import { getTranslations } from "next-intl/server";
import type { Race, Stadium } from "@/types/boatrace";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type RaceListProps = {
  races: Race[];
  stadiums: Stadium[];
  date: string;
};

function getStadiumName(
  stadiums: Stadium[],
  telCode: number,
  fallbackLabel: string
): string {
  return stadiums.find((s) => s.tel_code === telCode)?.name ?? fallbackLabel;
}

function groupRacesByStadium(races: Race[]): Map<number, Race[]> {
  const grouped = new Map<number, Race[]>();
  for (const race of races) {
    const existing = grouped.get(race.stadium_tel_code);
    if (existing) {
      existing.push(race);
    } else {
      grouped.set(race.stadium_tel_code, [race]);
    }
  }
  return grouped;
}

function formatDeadline(deadlineAt: string): string {
  // DBのtimestamp without time zoneはUTCで格納されている
  const date = new Date(deadlineAt + "Z");
  return date.toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tokyo",
  });
}

export async function RaceList({ races, stadiums, date }: RaceListProps) {
  const t = await getTranslations("races");

  if (races.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        {t("noRacesForDate", { date })}
      </div>
    );
  }

  const grouped = groupRacesByStadium(races);

  return (
    <div className="space-y-6">
      {Array.from(grouped.entries()).map(([telCode, stadiumRaces]) => (
        <Card key={telCode}>
          <CardHeader>
            <CardTitle>{getStadiumName(stadiums, telCode, t("stadiumFallback", { telCode }))}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">{t("raceNumberHeader")}</TableHead>
                  <TableHead>{t("raceNameHeader")}</TableHead>
                  <TableHead className="w-24">{t("deadlineHeader")}</TableHead>
                  <TableHead className="w-20">{t("lapsHeader")}</TableHead>
                  <TableHead className="w-24">{t("statusHeader")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stadiumRaces.map((race) => (
                  <TableRow
                    key={`${race.stadium_tel_code}-${race.race_number}`}
                    className={race.is_canceled ? "opacity-50" : ""}
                  >
                    <TableCell className="font-medium">
                      {race.race_number}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{race.title}</span>
                        {race.is_course_fixed && (
                          <Badge variant="secondary">{t("courseFixed")}</Badge>
                        )}
                        {race.is_stabilizer_used && (
                          <Badge variant="outline">{t("stabilizerUsed")}</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{formatDeadline(race.betting_deadline_at)}</TableCell>
                    <TableCell>{t("laps", { count: race.number_of_laps })}</TableCell>
                    <TableCell>
                      {race.is_canceled ? (
                        <Badge variant="destructive">{t("canceled")}</Badge>
                      ) : (
                        <Badge variant="default">{t("scheduled")}</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
