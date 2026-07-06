import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { calculatePagination, createPaginatedResult } from '../../common/utils/pagination.util';
import { hashPassword } from '../../common/utils/password.util';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await hashPassword(createUserDto.password);

    const user = await this.prisma.admin.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        role: createUserDto.role as any,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    this.logger.log(`Admin created: ${user.id}`);
    return user;
  }

  async findAll(pagination: PaginationDto) {
    const { skip, take } = calculatePagination(pagination);
    const { search } = pagination;

    const where = search
      ? {
          OR: [
            { email: { contains: search, mode: 'insensitive' as const } },
            { fullName: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      this.prisma.admin.findMany({
        where,
        skip,
        take,
        select: {
          id: true,
          email: true,
          fullName: true,
          role: true,
          isActive: true,
          lastLoginAt: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.admin.count({ where }),
    ]);

    return createPaginatedResult(users, total, pagination);
  }

  async findById(id: string) {
    const user = await this.prisma.admin.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            createdProducts: true,
            createdOrders: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.admin.findUnique({
      where: { email },
    });
  }

  async findByEmailOrUsername(email: string, username: string) {
    return this.prisma.admin.findFirst({
      where: {
        OR: [{ email }],
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findById(id); // Check if exists

    if (updateUserDto.password) {
      updateUserDto.password = await hashPassword(updateUserDto.password);
    }

    const updateData: any = { ...updateUserDto };
    if (updateUserDto.role) {
      updateData.role = updateUserDto.role as any;
    }

    const user = await this.prisma.admin.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    this.logger.log(`Admin updated: ${user.id}`);
    return user;
  }

  async remove(id: string) {
    await this.findById(id); // Check if exists

    await this.prisma.admin.delete({
      where: { id },
    });

    this.logger.log(`Admin deleted: ${id}`);
    return { message: 'User successfully deleted' };
  }

  async updateAvatar(id: string, avatarUrl: string) {
    return this.update(id, { avatar: avatarUrl });
  }
}
