import { PaginationDto, PaginationMetaDto, PaginatedResponseDto } from '../dto/pagination.dto';

export function calculatePagination(dto: PaginationDto) {
  const page = dto.page || 1;
  const limit = dto.limit || 10;
  const skip = (page - 1) * limit;

  return {
    skip,
    take: limit,
    page,
    limit,
  };
}

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

export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  pagination: PaginationDto,
): PaginatedResponseDto<T> {
  const page = pagination.page || 1;
  const limit = pagination.limit || 10;

  return {
    data,
    meta: createPaginationMeta(page, limit, total),
  };
}
