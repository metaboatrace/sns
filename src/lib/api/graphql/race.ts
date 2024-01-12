import { gql } from '@apollo/client';
import { getClient } from '@/lib/apolloClient';
import { Races } from '@/generated/graphql';

export async function getRaceCount() {
  const query = gql`
    query {
      races_aggregate {
        aggregate {
          count
        }
      }
    }
  `;

  const { data: countData } = await getClient().query({ query });

  return countData;
}

export async function getRaceCountByDate(date: string) {
  const query = gql`
    query ($date: date!) {
      races_aggregate(where: { date: { _eq: $date } }) {
        aggregate {
          count
        }
      }
    }
  `;

  const { data: countData } = await getClient().query({
    query,
    variables: { date },
  });

  return countData;
}

export async function getRaces(
  offset: number,
  limit: number,
): Promise<Races[]> {
  const query = gql`
    query ($offset: Int!, $limit: Int!) {
      races(
        order_by: { date: desc, stadium_tel_code: asc }
        offset: $offset
        limit: $limit
      ) {
        title
        date
        race_number
        stadium {
          tel_code
          name
        }
      }
    }
  `;

  const { data: queryData } = await getClient().query({
    query: query,
    variables: { offset, limit },
  });

  return queryData.races;
}

export async function getRacesByDate(
  offset: number,
  limit: number,
  date: string,
): Promise<Races[]> {
  const query = gql`
    query ($offset: Int!, $limit: Int!, $date: date!) {
      races(
        where: { date: { _eq: $date } }
        order_by: { date: desc, stadium_tel_code: asc }
        offset: $offset
        limit: $limit
      ) {
        title
        date
        race_number
        stadium {
          tel_code
          name
        }
      }
    }
  `;

  const { data: queryData } = await getClient().query({
    query,
    variables: { offset, limit, date },
  });

  return queryData.races;
}

export async function getRacesWithFilters(
  offset: number,
  limit: number,
  date: string,
  stadiumTelCode: number,
): Promise<Races[]> {
  const query = gql`
    query ($offset: Int!, $limit: Int!, $date: date!, $stadiumTelCode: Int!) {
      races(
        where: {
          date: { _eq: $date }
          stadium: { tel_code: { _eq: $stadiumTelCode } }
        }
        order_by: { date: desc, stadium_tel_code: asc }
        offset: $offset
        limit: $limit
      ) {
        title
        date
        race_number
        stadium {
          tel_code
          name
        }
      }
    }
  `;

  const { data: queryData } = await getClient().query({
    query: query,
    variables: { offset, limit, date, stadiumTelCode },
  });

  return queryData.races;
}
