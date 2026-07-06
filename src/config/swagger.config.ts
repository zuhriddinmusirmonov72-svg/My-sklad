import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('NestJS Enterprise API')
  .setDescription('Production-ready NestJS backend API documentation')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth',
  )
  .addTag('Authentication', 'Authentication endpoints')
  .addTag('Users', 'User management endpoints')
  .addTag('Posts', 'Post management endpoints')
  .addTag('Categories', 'Category management endpoints')
  .addTag('Upload', 'File upload endpoints')
  .build();
