#!/bin/sh

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
npx wait-on -t 60000 tcp:postgres:5432

# Run Prisma migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Start the Next.js application
echo "Starting the Next.js application..."
exec npm start