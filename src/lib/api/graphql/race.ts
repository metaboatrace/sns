import { gql } from '@apollo/client';
import { getClient } from '@/lib/apolloClient';
import { Races } from '@/generated/graphql';

export async function getRaceCount() {
  const query = gql`
    query GetRaceCount {
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

export async function getRaces(
  offset: number,
  limit: number,
): Promise<Races[]> {
  const query = gql`
    query GetRaces($offset: Int!, $limit: Int!) {
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
