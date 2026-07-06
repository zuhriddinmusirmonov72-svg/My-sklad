import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * Roles decorator to protect routes
 * @param roles - Array of admin roles that can access the route
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
