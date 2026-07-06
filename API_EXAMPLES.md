# API Usage Examples

## Authentication Examples

### 1. Register New User

**Request:**
```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "username": "newuser",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Success",
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "newuser@example.com",
      "username": "newuser",
      "firstName": "John",
      "lastName": "Doe",
      "role": "USER"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 2. Login

**Request:**
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "Admin123!"
}
```

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "admin@example.com",
      "username": "admin",
      "firstName": "Admin",
      "lastName": "User",
      "role": "ADMIN"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 3. Get Profile

**Request:**
```bash
GET /api/v1/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "admin@example.com",
    "username": "admin",
    "firstName": "Admin",
    "lastName": "User",
    "role": "ADMIN"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## User Management Examples

### 4. Get All Users (with Pagination)

**Request:**
```bash
GET /api/v1/users?page=1&limit=10&search=john
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": {
    "data": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "email": "john@example.com",
        "username": "john",
        "firstName": "John",
        "lastName": "Doe",
        "avatar": null,
        "role": "USER",
        "isActive": true,
        "createdAt": "2024-01-15T10:00:00.000Z",
        "updatedAt": "2024-01-15T10:00:00.000Z"
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1,
      "hasNextPage": false,
      "hasPreviousPage": false
    }
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 5. Get User by ID

**Request:**
```bash
GET /api/v1/users/550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "john@example.com",
    "username": "john",
    "firstName": "John",
    "lastName": "Doe",
    "avatar": null,
    "role": "USER",
    "isActive": true,
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z",
    "_count": {
      "posts": 5,
      "comments": 12
    }
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 6. Update User

**Request:**
```bash
PATCH /api/v1/users/550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "firstName": "John Updated",
  "lastName": "Doe Updated"
}
```

## Posts Examples

### 7. Create Post

**Request:**
```bash
POST /api/v1/posts
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "My Awesome Blog Post",
  "content": "This is the content of my blog post. It contains detailed information...",
  "published": true,
  "categoryId": "550e8400-e29b-41d4-a716-446655440001",
  "coverImage": "https://example.com/cover.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Success",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "title": "My Awesome Blog Post",
    "content": "This is the content of my blog post...",
    "slug": "my-awesome-blog-post-1705315200000",
    "published": true,
    "viewCount": 0,
    "authorId": "550e8400-e29b-41d4-a716-446655440000",
    "categoryId": "550e8400-e29b-41d4-a716-446655440001",
    "coverImage": "https://example.com/cover.jpg",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z",
    "author": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "username": "john",
      "firstName": "John",
      "lastName": "Doe",
      "avatar": null
    },
    "category": {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Technology",
      "slug": "technology",
      "description": "Posts about technology"
    }
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 8. Get All Posts (with Search)

**Request:**
```bash
GET /api/v1/posts?page=1&limit=10&search=nestjs
```

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": {
    "data": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440002",
        "title": "Getting Started with NestJS",
        "content": "NestJS is a progressive Node.js framework...",
        "slug": "getting-started-with-nestjs-1705315200000",
        "published": true,
        "viewCount": 150,
        "authorId": "550e8400-e29b-41d4-a716-446655440000",
        "categoryId": "550e8400-e29b-41d4-a716-446655440001",
        "coverImage": null,
        "createdAt": "2024-01-15T10:00:00.000Z",
        "updatedAt": "2024-01-15T10:00:00.000Z",
        "author": {
          "id": "550e8400-e29b-41d4-a716-446655440000",
          "username": "admin",
          "firstName": "Admin",
          "lastName": "User",
          "avatar": null
        },
        "category": {
          "id": "550e8400-e29b-41d4-a716-446655440001",
          "name": "Technology",
          "slug": "technology",
          "description": "Posts about technology"
        },
        "_count": {
          "comments": 5
        }
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1,
      "hasNextPage": false,
      "hasPreviousPage": false
    }
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Categories Examples

### 9. Create Category

**Request:**
```bash
POST /api/v1/categories
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "Web Development",
  "description": "All about web development"
}
```

**Response:**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Success",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440003",
    "name": "Web Development",
    "slug": "web-development",
    "description": "All about web development",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 10. Get All Categories

**Request:**
```bash
GET /api/v1/categories?page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": {
    "data": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "name": "Technology",
        "slug": "technology",
        "description": "Posts about technology",
        "createdAt": "2024-01-15T10:00:00.000Z",
        "updatedAt": "2024-01-15T10:00:00.000Z",
        "_count": {
          "posts": 15
        }
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1,
      "hasNextPage": false,
      "hasPreviousPage": false
    }
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## File Upload Examples

### 11. Upload Single File

**Request:**
```bash
POST /api/v1/upload/single
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data

file: [binary file data]
```

**Response:**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "File uploaded successfully",
  "data": {
    "filename": "file-1705315200000-123456789.jpg",
    "originalName": "photo.jpg",
    "mimetype": "image/jpeg",
    "size": 245678,
    "url": "/uploads/file-1705315200000-123456789.jpg"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 12. Upload Multiple Files

**Request:**
```bash
POST /api/v1/upload/multiple
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data

files: [binary file data 1]
files: [binary file data 2]
```

**Response:**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "2 file(s) uploaded successfully",
  "data": [
    {
      "filename": "file-1705315200000-123456789.jpg",
      "originalName": "photo1.jpg",
      "mimetype": "image/jpeg",
      "size": 245678,
      "url": "/uploads/file-1705315200000-123456789.jpg"
    },
    {
      "filename": "file-1705315200001-987654321.jpg",
      "originalName": "photo2.jpg",
      "mimetype": "image/jpeg",
      "size": 345678,
      "url": "/uploads/file-1705315200001-987654321.jpg"
    }
  ],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Error Responses

### Validation Error

```json
{
  "success": false,
  "statusCode": 400,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/v1/auth/register",
  "method": "POST",
  "error": "Bad Request",
  "message": [
    "email must be an email",
    "password must be longer than or equal to 8 characters"
  ]
}
```

### Unauthorized Error

```json
{
  "success": false,
  "statusCode": 401,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/v1/auth/profile",
  "method": "GET",
  "error": "Unauthorized",
  "message": "Unauthorized access"
}
```

### Not Found Error

```json
{
  "success": false,
  "statusCode": 404,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/v1/users/invalid-id",
  "method": "GET",
  "error": "Not Found",
  "message": "User with ID invalid-id not found"
}
```

### Forbidden Error

```json
{
  "success": false,
  "statusCode": 403,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/v1/users",
  "method": "POST",
  "error": "Forbidden",
  "message": "Forbidden resource"
}
```
