export const DEFAULT_PAGE_SIZE = 20;

/**
 * Parse the page number from searchParams, defaulting to 1.
 */
export function parsePageParam(
  params: Record<string, string | string[] | undefined>,
): number {
  return Math.max(1, Number(params.page) || 1);
}

export function getPaginationData(page: number, totalCount: number, pageSize = DEFAULT_PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const limit = pageSize;
  const offset = (currentPage - 1) * pageSize;

  return {
    currentPage,
    totalPages,
    limit,
    offset,
  };
}
