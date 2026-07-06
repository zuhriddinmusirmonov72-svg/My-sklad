import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  IsBoolean,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Wireless Bluetooth Headphones',
    description: 'Product name',
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @ApiPropertyOptional({
    example: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
    description: 'Product description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 79.99,
    description: 'Product price',
    minimum: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;

  @ApiPropertyOptional({
    example: 59.99,
    description: 'Discount price',
    minimum: 0,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  discountPrice?: number;

  @ApiProperty({
    example: 'ELEC-HEAD-001',
    description: 'Stock keeping unit (SKU)',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  sku: string;

  @ApiProperty({
    example: 50,
    description: 'Stock quantity',
    minimum: 0,
    default: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  stockQuantity: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Minimum stock level for alerts',
    minimum: 0,
    default: 5,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  minStockLevel?: number;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Category ID',
  })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Is product active',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({
    example: false,
    description: 'Is product featured',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @ApiPropertyOptional({
    example: 'wireless,bluetooth,headphones,audio',
    description: 'Comma-separated tags',
  })
  @IsString()
  @IsOptional()
  tags?: string;

  @ApiPropertyOptional({
    example: 'pcs',
    description: 'Unit of measurement',
    default: 'pcs',
  })
  @IsString()
  @IsOptional()
  unit?: string;

  @ApiPropertyOptional({
    example: 0.25,
    description: 'Product weight in kg',
  })
  @IsNumber()
  @IsOptional()
  weight?: number;

  @ApiPropertyOptional({
    example: '20 x 15 x 5 cm',
    description: 'Product dimensions',
  })
  @IsString()
  @IsOptional()
  dimensions?: string;
}
