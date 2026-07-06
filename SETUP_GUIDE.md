# NestJS Enterprise Backend - Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (v14 or higher)
- Docker & Docker Compose (optional)

## 🚀 Quick Start

### Method 1: Local Development

#### 1. Clone and Install Dependencies

```bash
# Install dependencies
npm install
```

#### 2. Setup Environment Variables

```bash
# Copy environment example
copy .env.example .env
```

Edit `.env` file with your configuration:

```env
# Application
NODE_ENV=development
PORT=3000
API_PREFIX=api/v1

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nestjs_enterprise?schema=public"

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=1d
JWT_REFRESH_SECRET=your-super-secret-refresh-jwt-key-change-this-in-production
JWT_REFRESH_EXPIRES_IN=7d

# Cors
CORS_ORIGIN=http://localhost:3000,http://localhost:3001

# Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_DESTINATION=./uploads

# Throttle Configuration
THROTTLE_TTL=60
THROTTLE_LIMIT=10

# Logging
LOG_LEVEL=debug
```

#### 3. Setup PostgreSQL Database

```bash
# Create database (using psql or pgAdmin)
CREATE DATABASE nestjs_enterprise;
```

#### 4. Setup Prisma

```bash
# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed database with sample data
npm run prisma:seed
```

#### 5. Start Development Server

```bash
# Start in development mode
npm run start:dev
```

Application will be available at:
- API: http://localhost:3000/api/v1
- Swagger Docs: http://localhost:3000/api/docs

### Method 2: Docker Development

#### 1. Start with Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### 2. Run Migrations in Docker

```bash
# Access app container
docker exec -it nestjs_app sh

# Run migrations
npx prisma migrate dev

# Seed database
npx prisma db seed

# Exit container
exit
```

## 📝 Available Scripts

```bash
# Development
npm run start:dev          # Start with hot-reload
npm run start:debug        # Start in debug mode

# Production
npm run build              # Build for production
npm run start:prod         # Start production server

# Database
npm run prisma:generate    # Generate Prisma Client
npm run prisma:migrate     # Run migrations
npm run prisma:studio      # Open Prisma Studio
npm run prisma:seed        # Seed database

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format with Prettier

# Testing
npm run test               # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:cov           # Generate coverage report
npm run test:e2e           # Run E2E tests
```

## 🔐 Default Credentials

After seeding, you can use these credentials:

**Admin User:**
- Email: `admin@example.com`
- Password: `Admin123!`

**Regular User:**
- Email: `user@example.com`
- Password: `Admin123!`

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/profile` - Get user profile (Protected)
- `POST /api/v1/auth/refresh` - Refresh access token (Protected)

### Users
- `GET /api/v1/users` - Get all users (Protected)
- `GET /api/v1/users/:id` - Get user by ID (Protected)
- `POST /api/v1/users` - Create user (Admin only)
- `PATCH /api/v1/users/:id` - Update user (Protected)
- `DELETE /api/v1/users/:id` - Delete user (Admin only)

### Posts
- `GET /api/v1/posts` - Get all posts (Public)
- `GET /api/v1/posts/:id` - Get post by ID (Public)
- `POST /api/v1/posts` - Create post (Protected)
- `PATCH /api/v1/posts/:id` - Update post (Protected)
- `DELETE /api/v1/posts/:id` - Delete post (Protected)

### Categories
- `GET /api/v1/categories` - Get all categories (Public)
- `GET /api/v1/categories/:id` - Get category by ID (Public)
- `POST /api/v1/categories` - Create category (Admin/Moderator)
- `PATCH /api/v1/categories/:id` - Update category (Admin/Moderator)
- `DELETE /api/v1/categories/:id` - Delete category (Admin)

### Upload
- `POST /api/v1/upload/single` - Upload single file (Protected)
- `POST /api/v1/upload/multiple` - Upload multiple files (Protected)
- `POST /api/v1/upload/any` - Upload files with any field names (Protected)
- `DELETE /api/v1/upload/:filename` - Delete file (Protected)

## 🔍 Testing the API

### Using Swagger UI
1. Navigate to http://localhost:3000/api/docs
2. Click "Authorize" button
3. Login to get JWT token
4. Paste token in authorization field
5. Try different endpoints

### Using cURL

```bash
# Register a new user
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "Test123!",
    "firstName": "Test",
    "lastName": "User"
  }'

# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "Admin123!"
  }'

# Get posts (with JWT token)
curl -X GET http://localhost:3000/api/v1/posts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using Postman
1. Import the API collection (can be generated from Swagger)
2. Set environment variable for `baseUrl` and `token`
3. Test all endpoints

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Check PostgreSQL is running
# On Windows (if installed as service)
sc query postgresql-x64-14

# Test connection
psql -U postgres -h localhost -d nestjs_enterprise
```

### Prisma Issues

```bash
# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Generate Prisma Client
npx prisma generate

# View database in Prisma Studio
npx prisma studio
```

### Port Already in Use

```bash
# On Windows, find process using port 3000
netstat -ano | findstr :3000

# Kill process (replace PID)
taskkill /PID <PID> /F
```

### Docker Issues

```bash
# Remove all containers and volumes
docker-compose down -v

# Rebuild containers
docker-compose up --build

# View container logs
docker-compose logs app
docker-compose logs postgres
```

## 🔧 Production Deployment

### 1. Environment Variables
Update `.env` with production values:
- Use strong JWT secrets
- Update CORS origins
- Set NODE_ENV to production
- Use production database URL

### 2. Build Application

```bash
npm run build
```

### 3. Run Migrations

```bash
npm run prisma:migrate
```

### 4. Start Production Server

```bash
npm run start:prod
```

### 5. Using Docker

```bash
# Build production image
docker build -t nestjs-app .

# Run container
docker run -p 3000:3000 --env-file .env nestjs-app
```

## 📦 Deployment Platforms

### Heroku
```bash
# Add Heroku Postgres addon
# Set environment variables in Heroku dashboard
# Deploy with Git
git push heroku main
```

### DigitalOcean / AWS / Azure
- Use Docker deployment
- Set up PostgreSQL instance
- Configure environment variables
- Use reverse proxy (Nginx)
- Enable HTTPS with SSL certificate

## 🔒 Security Checklist

- ✅ JWT authentication implemented
- ✅ Password hashing (bcrypt)
- ✅ Input validation (class-validator)
- ✅ CORS configured
- ✅ Helmet security headers
- ✅ Rate limiting (Throttler)
- ✅ File upload validation
- ✅ SQL injection protection (Prisma)
- ⚠️ Change default JWT secrets in production
- ⚠️ Use HTTPS in production
- ⚠️ Regular security updates

## 📞 Support

For issues and questions:
1. Check this guide
2. Review the documentation
3. Check Swagger API docs
4. Review logs in `logs/` directory

## 🎉 Success!

Your NestJS Enterprise Backend is now ready for development!

Visit:
- API: http://localhost:3000/api/v1
- Docs: http://localhost:3000/api/docs
- Prisma Studio: Run `npm run prisma:studio`
