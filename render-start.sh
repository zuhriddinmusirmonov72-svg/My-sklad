#!/usr/bin/env sh

# Exit on error
set -e

echo "Starting deployment process..."

# Render loads Secret Files into /etc/secrets/
# If a .env file exists there, load its variables into the environment
if [ -f /etc/secrets/.env ]; then
  echo "Loading environment variables from /etc/secrets/.env..."
  export $(grep -v '^#' /etc/secrets/.env | xargs)
fi

echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Starting Node application..."
node dist/main
