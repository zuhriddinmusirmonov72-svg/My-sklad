# NestJS Enterprise Backend - Project Structure

## 📁 Complete Folder Structure

```
nestjs-enterprise-backend/
│
├── prisma/                         # Prisma ORM
│   ├── schema.prisma              # Database schema
│   └── seed.ts                    # Database seeding
│
├── src/                           # Source code
│   ├── common/                    # Shared modules
│   │   ├── decorators/           # Custom decorators
│   │   │   ├── current-user.decorator.ts
│   │   │   ├── public.decorator.ts
│   │   │   └── roles.decorator.ts
│   │   ├── dto/                  # Data Transfer Objects
│   │   │   └── pagination.dto.ts
│   │   ├── filters/              # Exception filters
│   │   │   └── http-exception.filter.ts
│   │   ├── guards/               # Auth guards
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── interceptors/         # Response interceptors
│   │   │   ├── logging.interceptor.ts
│   │   │   └── transform.interceptor.ts
│   │   ├── pipes/                # Validation pipes
│   │   └── utils/                # Utility functions
│   │       ├── pagination.util.ts
│   │       └── password.util.ts
│   │
│   ├── config/                   # Configuration files
│   │   ├── app.config.ts
│   │   ├── database.config.ts
│   │   ├── jwt.config.ts
│   │   ├── swagger.config.ts
│   │   └── upload.config.ts
│   │
│   ├── modules/                  # Feature modules
│   │   ├── auth/                # Authentication
│   │   │   ├── dto/
│   │   │   │   ├── login.dto.ts
│   │   │   │   └── register.dto.ts
│   │   │   ├── strategies/
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   └── local.strategy.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   └── auth.service.ts
│   │   │
│   │   ├── users/               # User management
│   │   │   ├── dto/
│   │   │   │   ├── create-user.dto.ts
│   │   │   │   └── update-user.dto.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.module.ts
│   │   │   └── users.service.ts
│   │   │
│   │   ├── posts/               # Post management
│   │   │   ├── dto/
│   │   │   │   ├── create-post.dto.ts
│   │   │   │   └── update-post.dto.ts
│   │   │   ├── posts.controller.ts
│   │   │   ├── posts.module.ts
│   │   │   └── posts.service.ts
│   │   │
│   │   ├── categories/          # Category management
│   │   │   ├── dto/
│   │   │   │   ├── create-category.dto.ts
│   │   │   │   └── update-category.dto.ts
│   │   │   ├── categories.controller.ts
│   │   │   ├── categories.module.ts
│   │   │   └── categories.service.ts
│   │   │
│   │   ├── upload/              # File upload
│   │   │   ├── upload.controller.ts
│   │   │   ├── upload.module.ts
│   │   │   └── upload.service.ts
│   │   │
│   │   └── prisma/              # Prisma service
│   │       ├── prisma.module.ts
│   │       └── prisma.service.ts
│   │
│   ├── app.module.ts            # Root module
│   └── main.ts                  # Application entry point
│
├── logs/                         # Application logs
│   └── .gitkeep
│
├── uploads/                      # Uploaded files
│   └── .gitkeep
│
├── .env.example                  # Environment variables example
├── .eslintrc.js                  # ESLint configuration
├── .gitignore                    # Git ignore rules
├── .prettierrc                   # Prettier configuration
├── docker-compose.yml            # Docker compose configuration
├── Dockerfile                    # Docker configuration
├── nest-cli.json                 # Nest CLI configuration
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── README.md                     # Project documentation
└── PROJECT_STRUCTURE.md          # This file
```

## 🎯 Module Structure Explanation

### Common Module
- **Decorators**: Custom decorators for user info, public routes, and roles
- **DTOs**: Reusable Data Transfer Objects (pagination, etc.)
- **Filters**: Global exception handling
- **Guards**: Authentication and authorization guards
- **Interceptors**: Request/response transformation and logging
- **Utils**: Helper functions (password hashing, pagination)

### Config Module
- Centralized configuration management
- Environment-based settings
- Type-safe configuration access

### Feature Modules
Each feature follows the same structure:
- **Controller**: HTTP request handling
- **Service**: Business logic
- **Module**: Dependency injection
- **DTOs**: Request/response validation

### Prisma Module
- Database connection management
- Prisma client integration
- Global module for database access

## 🔑 Key Features by Module

### Auth Module
- User registration
- User login (JWT)
- Token refresh
- User profile retrieval
- Local & JWT strategies

### Users Module
- CRUD operations
- Pagination & search
- Role-based access control
- Password hashing

### Posts Module
- Create, read, update, delete posts
- Pagination & search
- Slug generation
- View count tracking
- Author & category relations

### Categories Module
- CRUD operations
- Automatic slug generation
- Post count tracking
- Search functionality

### Upload Module
- Single file upload
- Multiple file upload
- File type validation
- File size limits
- File deletion

## 🛠️ Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (Passport)
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI
- **File Upload**: Multer
- **Logging**: Winston
- **Security**: Helmet, CORS
- **Containerization**: Docker

## 📝 Best Practices Implemented

1. **Modular Architecture**: Separated concerns by modules
2. **DRY Principle**: Reusable utilities and DTOs
3. **Type Safety**: Full TypeScript coverage
4. **Error Handling**: Global exception filter
5. **Logging**: Comprehensive logging with Winston
6. **Security**: JWT authentication, role-based access, input validation
7. **Documentation**: Complete Swagger documentation
8. **Scalability**: Pagination, search, and optimization
9. **Testing Ready**: Structure supports unit and e2e tests
10. **Docker Support**: Easy deployment and development

## 🚀 Getting Started

1. Install dependencies: `npm install`
2. Setup environment: `cp .env.example .env`
3. Generate Prisma Client: `npm run prisma:generate`
4. Run migrations: `npm run prisma:migrate`
5. Seed database: `npm run prisma:seed`
6. Start development: `npm run start:dev`

## 📚 API Documentation

Access Swagger UI at: http://localhost:3000/api/docs

## 🔒 Default Credentials (After Seeding)

**Admin User:**
- Email: admin@example.com
- Password: Admin123!

**Regular User:**
- Email: user@example.com
- Password: Admin123!
