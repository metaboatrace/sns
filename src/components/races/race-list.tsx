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
  telCode: number
): string {
  return stadiums.find((s) => s.tel_code === telCode)?.name ?? `場コード${telCode}`;
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

export function RaceList({ races, stadiums, date }: RaceListProps) {
  if (races.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        {date} のレースデータがありません。
      </div>
    );
  }

  const grouped = groupRacesByStadium(races);

  return (
    <div className="space-y-6">
      {Array.from(grouped.entries()).map(([telCode, stadiumRaces]) => (
        <Card key={telCode}>
          <CardHeader>
            <CardTitle>{getStadiumName(stadiums, telCode)}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">R</TableHead>
                  <TableHead>レース名</TableHead>
                  <TableHead className="w-24">締切</TableHead>
                  <TableHead className="w-20">周回</TableHead>
                  <TableHead className="w-24">状態</TableHead>
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
                          <Badge variant="secondary">進入固定</Badge>
                        )}
                        {race.is_stabilizer_used && (
                          <Badge variant="outline">安定板</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{formatDeadline(race.betting_deadline_at)}</TableCell>
                    <TableCell>{race.number_of_laps}周</TableCell>
                    <TableCell>
                      {race.is_canceled ? (
                        <Badge variant="destructive">中止</Badge>
                      ) : (
                        <Badge variant="default">予定</Badge>
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
