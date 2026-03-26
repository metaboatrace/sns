import { gql } from "graphql-request";
import { safeRequest } from "../safe-request";
import type { Race, Stadium } from "@/types/boatrace";

const GET_LATEST_DATE = gql`
  query GetLatestDate {
    races(order_by: { date: desc }, limit: 1) {
      date
    }
  }
`;

const GET_RACES_BY_DATE = gql`
  query GetRacesByDate($date: date!) {
    races(
      where: { date: { _eq: $date } }
      order_by: [{ stadium_tel_code: asc }, { race_number: asc }]
    ) {
      stadium_tel_code
      date
      race_number
      title
      is_course_fixed
      is_stabilizer_used
      number_of_laps
      betting_deadline_at
      is_canceled
    }
  }
`;

const GET_STADIUMS = gql`
  query GetStadiums {
    stadiums(order_by: { tel_code: asc }) {
      tel_code
      name
      prefecture_id
    }
  }
`;

type GetLatestDateResponse = {
  races: Pick<Race, "date">[];
};

type GetRacesByDateResponse = {
  races: Race[];
};

type GetStadiumsResponse = {
  stadiums: Stadium[];
};

export async function getLatestDate(): Promise<string | null> {
  return safeRequest<GetLatestDateResponse, string | null>(
    GET_LATEST_DATE,
    undefined,
    (data) => data.races[0]?.date ?? null,
    null,
    "latest date",
  );
}

export async function getRacesByDate(date: string): Promise<Race[]> {
  return safeRequest<GetRacesByDateResponse, Race[]>(
    GET_RACES_BY_DATE,
    { date },
    (data) => data.races,
    [],
    "races",
  );
}

export async function getStadiums(): Promise<Stadium[]> {
  return safeRequest<GetStadiumsResponse, Stadium[]>(
    GET_STADIUMS,
    undefined,
    (data) => data.stadiums,
    [],
    "stadiums",
  );
}
