import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'admin@ecommerce.com',
    description: 'Admin email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Admin Manager',
    description: 'Full name',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  fullName: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'Password (min 8 characters, at least 1 uppercase, 1 lowercase, 1 number)',
    minLength: 8,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
  })
  password: string;

  @ApiPropertyOptional({
    example: 'ADMIN',
    description: 'Admin role',
    enum: ['SUPER_ADMIN', 'ADMIN', 'MANAGER'],
    default: 'ADMIN',
  })
  @IsOptional()
  @IsEnum(['SUPER_ADMIN', 'ADMIN', 'MANAGER'])
  role?: 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER';

  @ApiPropertyOptional({
    example: 'https://example.com/avatar.jpg',
    description: 'Avatar URL',
  })
  @IsOptional()
  @IsString()
  avatar?: string;
}
