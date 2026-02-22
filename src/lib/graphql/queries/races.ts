import { gql } from "graphql-request";
import { getGraphQLClient } from "../client";
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
  try {
    const client = getGraphQLClient();
    const data = await client.request<GetLatestDateResponse>(GET_LATEST_DATE);
    return data.races[0]?.date ?? null;
  } catch (error) {
    console.error("Failed to fetch latest date:", error);
    return null;
  }
}

export async function getRacesByDate(date: string): Promise<Race[]> {
  try {
    const client = getGraphQLClient();
    const data = await client.request<GetRacesByDateResponse>(GET_RACES_BY_DATE, {
      date,
    });
    return data.races;
  } catch (error) {
    console.error("Failed to fetch races:", error);
    return [];
  }
}

export async function getStadiums(): Promise<Stadium[]> {
  try {
    const client = getGraphQLClient();
    const data = await client.request<GetStadiumsResponse>(GET_STADIUMS);
    return data.stadiums;
  } catch (error) {
    console.error("Failed to fetch stadiums:", error);
    return [];
  }
}
