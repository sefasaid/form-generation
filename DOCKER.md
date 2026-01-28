# Docker Setup Guide

This guide explains how to run the Form Assignment project using Docker.

## Prerequisites

- Docker (version 20.10 or later)
- Docker Compose (version 2.0 or later)

## Quick Start

1. **Copy the environment file:**
   ```bash
   cp env.example .env
   ```

2. **Update the `.env` file** with your desired configuration (especially passwords for production)

3. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - API: http://localhost:3001
   - PostgreSQL: localhost:5432

## Services

### PostgreSQL Database
- **Container**: `form-postgres`
- **Port**: 5432 (configurable via `POSTGRES_PORT`)
- **Database**: `formdb` (configurable via `POSTGRES_DB`)
- **User**: `postgres` (configurable via `POSTGRES_USER`)
- **Password**: `postgres` (configurable via `POSTGRES_PASSWORD`)

### API Service
- **Container**: `form-api`
- **Port**: 3001 (configurable via `API_PORT`)
- **Dockerfile**: `Dockerfile.api`
- Automatically runs Prisma migrations on startup

### Frontend Service
- **Container**: `form-frontend`
- **Port**: 3000 (configurable via `FRONTEND_PORT`)
- **Dockerfile**: `Dockerfile.frontend`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=formdb
POSTGRES_PORT=5432

# Database URL (used by Prisma)
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/formdb?schema=public

# API Configuration
API_PORT=3001

# Frontend Configuration
FRONTEND_PORT=3000
NEXT_PUBLIC_API_URL=http://localhost:3001

# JWT Secret (for production, use a strong random string)
JWT_SECRET=your-secret-key-change-in-production
```

## Common Commands

### Start services in detached mode
```bash
docker-compose up -d
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Stop services
```bash
docker-compose down
```

### Stop and remove volumes (clears database)
```bash
docker-compose down -v
```

### Rebuild a specific service
```bash
docker-compose build api
docker-compose build frontend
```

### Run database migrations manually
```bash
docker-compose exec api npx prisma migrate deploy
```

### Run database seed
```bash
docker-compose exec api npx prisma db seed
```

### Access database shell
```bash
docker-compose exec postgres psql -U postgres -d formdb
```

## Building Individual Images

### Build API image
```bash
docker build -f Dockerfile.api -t form-api:latest .
```

### Build Frontend image
```bash
docker build -f Dockerfile.frontend -t form-frontend:latest .
```

## Production Considerations

1. **Change default passwords**: Update all default passwords in `.env` file
2. **Use secrets management**: Consider using Docker secrets or a secrets manager for production
3. **Configure CORS**: Update CORS settings in the API for production domains
4. **Set up reverse proxy**: Use nginx or similar for production
5. **Enable SSL/TLS**: Configure SSL certificates for HTTPS
6. **Database backups**: Set up regular database backups
7. **Resource limits**: Add resource limits to docker-compose.yml for production
8. **Health checks**: Monitor service health in production

## Troubleshooting

### Database connection issues
- Ensure PostgreSQL container is healthy: `docker-compose ps`
- Check database logs: `docker-compose logs postgres`
- Verify DATABASE_URL in `.env` matches docker-compose configuration

### API not starting
- Check API logs: `docker-compose logs api`
- Verify Prisma migrations completed successfully
- Ensure DATABASE_URL is correctly set

### Frontend not connecting to API
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check if API service is running: `docker-compose ps`
- Ensure both services are on the same Docker network

### Port conflicts
- Change ports in `.env` file if default ports are already in use
- Update docker-compose.yml port mappings if needed
