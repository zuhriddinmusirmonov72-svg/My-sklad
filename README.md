# NestJS Enterprise Backend

Production-ready NestJS backend application with enterprise architecture.

## 🚀 Features

- **NestJS Framework** - Modern Node.js framework
- **PostgreSQL** - Reliable relational database
- **Prisma ORM** - Type-safe database client
- **JWT Authentication** - Secure authentication system
- **Swagger Documentation** - API documentation
- **File Upload** - Multer integration
- **Docker Support** - Container deployment
- **Validation** - Request validation with class-validator
- **Global Exception Filter** - Centralized error handling
- **Logging** - Winston logger integration
- **Pagination** - Built-in pagination support
- **Search** - Advanced search capabilities

## 📁 Project Structure

```
src/
├── common/                 # Shared modules
│   ├── decorators/        # Custom decorators
│   ├── filters/           # Exception filters
│   ├── guards/            # Auth guards
│   ├── interceptors/      # Response interceptors
│   ├── pipes/             # Validation pipes
│   └── utils/             # Utility functions
├── config/                # Configuration files
│   ├── app.config.ts
│   ├── database.config.ts
│   ├── jwt.config.ts
│   └── swagger.config.ts
├── modules/               # Feature modules
│   ├── auth/             # Authentication
│   ├── users/            # User management
│   └── upload/           # File upload
├── app.module.ts         # Root module
└── main.ts               # Application entry point
```

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

## 🚀 Running the app

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod

# Docker
docker-compose up -d
```

## 📝 API Documentation

After starting the application, visit:
- Swagger UI: http://localhost:3000/api/docs

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📦 Database Management

```bash
# Generate Prisma Client
npm run prisma:generate

# Create migration
npm run prisma:migrate

# Open Prisma Studio
npm run prisma:studio
```

## 🔐 Environment Variables

See `.env.example` for all available environment variables.

## 📄 License

MIT
