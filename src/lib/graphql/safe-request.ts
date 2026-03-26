import type { RequestDocument, Variables } from 'graphql-request';
import { getGraphQLClient } from './client';

/**
 * Execute a GraphQL request with standardized error handling.
 *
 * On success, returns the result of `extract(data)`.
 * On failure, logs the error and returns `fallback`.
 */
export async function safeRequest<TData, TResult>(
  document: RequestDocument,
  variables: Variables | undefined,
  extract: (data: TData) => TResult,
  fallback: TResult,
  errorLabel: string,
): Promise<TResult> {
  try {
    const client = getGraphQLClient();
    const data = await client.request<TData>(document, variables);
    return extract(data);
  } catch (error) {
    console.error(`Failed to fetch ${errorLabel}:`, error);
    return fallback;
  }
}
