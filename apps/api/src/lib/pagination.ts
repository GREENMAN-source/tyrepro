export function getPagination(query: Record<string, unknown>) {
  const page = Math.max(Number(query.page ?? 1), 1);
  const pageSize = Math.min(Math.max(Number(query.pageSize ?? 12), 1), 100);
  return { page, pageSize, skip: (page - 1) * pageSize, take: pageSize };
}

export function paginated<T>(items: T[], total: number, page: number, pageSize: number) {
  return {
    data: items,
    meta: {
      total,
      page,
      pageSize,
      pageCount: Math.ceil(total / pageSize)
    }
  };
}
