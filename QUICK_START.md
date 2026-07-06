# 🚀 Quick Start Guide

## Prerequisites
- Node.js v18+
- PostgreSQL v14+
- npm

## Installation (5 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
copy .env.example .env

# 3. Create PostgreSQL database
# Using psql: CREATE DATABASE nestjs_enterprise;

# 4. Generate Prisma Client
npm run prisma:generate

# 5. Run migrations
npm run prisma:migrate

# 6. Seed database (optional)
npm run prisma:seed

# 7. Start development server
npm run start:dev
```

## Access Points

- **API**: http://localhost:3000/api/v1
- **Swagger Docs**: http://localhost:3000/api/docs
- **Prisma Studio**: `npm run prisma:studio`

## Default Login Credentials

**Admin:**
- Email: `admin@example.com`
- Password: `Admin123!`

**User:**
- Email: `user@example.com`
- Password: `Admin123!`

## Test API

### 1. Login (Get Token)
```bash
POST http://localhost:3000/api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "Admin123!"
}
```

### 2. Get Users (Protected)
```bash
GET http://localhost:3000/api/v1/users
Authorization: Bearer YOUR_TOKEN_HERE
```

### 3. Create Post
```bash
POST http://localhost:3000/api/v1/posts
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "My First Post",
  "content": "This is my first post content",
  "published": true
}
```

## Docker (Alternative)

```bash
# Start all services (PostgreSQL + App)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Project Structure

```
src/
├── common/              # Shared utilities
│   ├── decorators/     # Custom decorators
│   ├── filters/        # Exception filters
│   ├── guards/         # Auth guards
│   ├── interceptors/   # Response interceptors
│   └── utils/          # Helper functions
├── config/             # Configuration files
├── modules/            # Feature modules
│   ├── auth/          # Authentication
│   ├── users/         # User management
│   ├── posts/         # Post management
│   ├── categories/    # Category management
│   ├── upload/        # File upload
│   └── prisma/        # Database service
├── app.module.ts      # Root module
└── main.ts            # Entry point
```

## Available Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/profile` - Get profile

### Users (Protected)
- `GET /api/v1/users` - List users
- `GET /api/v1/users/:id` - Get user
- `PATCH /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user (Admin)

### Posts
- `GET /api/v1/posts` - List posts (Public)
- `GET /api/v1/posts/:id` - Get post (Public)
- `POST /api/v1/posts` - Create post (Protected)
- `PATCH /api/v1/posts/:id` - Update post (Protected)
- `DELETE /api/v1/posts/:id` - Delete post (Protected)

### Categories
- `GET /api/v1/categories` - List categories (Public)
- `POST /api/v1/categories` - Create category (Admin/Mod)
- `PATCH /api/v1/categories/:id` - Update category (Admin/Mod)
- `DELETE /api/v1/categories/:id` - Delete category (Admin)

### Upload (Protected)
- `POST /api/v1/upload/single` - Upload file
- `POST /api/v1/upload/multiple` - Upload multiple files
- `DELETE /api/v1/upload/:filename` - Delete file

## Features

✅ **NestJS** - Progressive Node.js framework
✅ **PostgreSQL** - Reliable database
✅ **Prisma ORM** - Type-safe database access
✅ **JWT Auth** - Secure authentication
✅ **Swagger** - API documentation
✅ **File Upload** - Multer integration
✅ **Validation** - Request validation
✅ **Pagination** - Built-in pagination
✅ **Search** - Full-text search
✅ **Logging** - Winston logger
✅ **Docker** - Containerization
✅ **Security** - Helmet, CORS, Rate limiting

## Common Commands

```bash
# Development
npm run start:dev           # Start with hot-reload
npm run start:debug         # Start in debug mode

# Database
npm run prisma:studio       # Open Prisma Studio
npm run prisma:generate     # Generate Prisma Client
npm run prisma:migrate      # Run migrations

# Production
npm run build               # Build for production
npm run start:prod          # Start production

# Testing
npm run test                # Run tests
npm run test:e2e            # Run E2E tests

# Code Quality
npm run lint                # Lint code
npm run format              # Format code
```

## Need Help?

- 📚 **Full Documentation**: See `README.md`
- 🔧 **Setup Guide**: See `SETUP_GUIDE.md`
- 📋 **API Examples**: See `API_EXAMPLES.md`
- 🏗️ **Project Structure**: See `PROJECT_STRUCTURE.md`
- 📖 **Swagger Docs**: http://localhost:3000/api/docs

## Troubleshooting

**Database connection error?**
```bash
# Check PostgreSQL is running
# Update DATABASE_URL in .env
```

**Port 3000 in use?**
```bash
# Change PORT in .env
# Or kill process using port 3000
```

**Prisma errors?**
```bash
npm run prisma:generate
npm run prisma:migrate
```

## What's Next?

1. ✅ Explore API via Swagger: http://localhost:3000/api/docs
2. ✅ Test endpoints with Postman or cURL
3. ✅ Customize for your needs
4. ✅ Add your business logic
5. ✅ Deploy to production

**Happy Coding! 🎉**
