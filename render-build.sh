#!/usr/bin/env sh

# Exit on error
set -e

echo "Starting build process..."

# Install dependencies
npm ci

# Set dummy DATABASE_URL for prisma generate so it doesn't fail if actual DB is not available at build time
export DATABASE_URL="postgresql://dummy:dummy@dummy:5432/dummy"

echo "Generating Prisma Client..."
npx prisma generate

echo "Building NestJS application..."
npm run build

echo "Build complete!"
