import { PaginationDto, PaginationMetaDto, PaginatedResultDto } from '../dto/pagination.dto';

export function createPaginationMeta(
  page: number,
  limit: number,
  total: number,
): PaginationMetaDto {
  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

export function createPaginatedResult<T>(
  data: T[],
  total: number,
  pagination: PaginationDto,
): PaginatedResultDto<T> {
  const { page = 1, limit = 10 } = pagination;

  return {
    data,
    meta: createPaginationMeta(page, limit, total),
  };
}

export function calculatePagination(pagination: PaginationDto) {
  const page = pagination.page || 1;
  const limit = pagination.limit || 10;
  const skip = (page - 1) * limit;

  return {
    skip,
    take: limit,
  };
}
