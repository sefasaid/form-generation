#!/bin/sh
set -e

echo "Waiting for database to be ready..."
sleep 5

echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Checking if seed is needed..."

MIGRATION_COUNT=$(npx prisma db execute --stdin <<EOF
SELECT COUNT(*) FROM "_prisma_migrations";
EOF
)

if echo "$MIGRATION_COUNT" | grep -q "0"; then
  echo "🌱 Database is fresh. Running seed..."
  npx prisma db seed
else
  echo "⏭ Seed skipped (database already initialized)"
fi

echo "Starting API server..."
exec node dist/main.js
