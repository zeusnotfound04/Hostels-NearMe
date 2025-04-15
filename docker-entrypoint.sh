#!/bin/sh
set -e

# Wait for 5 seconds to allow environment variables to be fully loaded
echo "Waiting for environment variables to be fully loaded..."
sleep 5

# Check if DATABASE_URL is set and correctly formatted
if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL environment variable is not set"
  exit 1
elif ! echo "$DATABASE_URL" | grep -q "^postgresql://" && ! echo "$DATABASE_URL" | grep -q "^postgres://"; then
  echo "ERROR: DATABASE_URL must start with 'postgresql://' or 'postgres://'"
  exit 1
fi

# Check if NEXTAUTH_SECRET is set
if [ -z "$NEXTAUTH_SECRET" ]; then
  echo "WARNING: NEXTAUTH_SECRET is not set. Authentication may not work properly."
fi

# Check if NEXTAUTH_URL is set
if [ -z "$NEXTAUTH_URL" ]; then
  export NEXTAUTH_URL="http://localhost:3000"
  echo "NEXTAUTH_URL was not set. Defaulting to: $NEXTAUTH_URL"
fi

# Generate Prisma client if needed
echo "Ensuring Prisma client is generated..."
npx prisma generate

# Start the Next.js application
echo "Starting Next.js application..."
exec "$@"