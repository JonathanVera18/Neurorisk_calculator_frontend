# docker-compose.yml
version: '3.8'

services:
  # Frontend React Application
  frontend:
    build:
      context: ./neurorisk_calculator_frontend
      dockerfile: docker/Dockerfile
      args:
        VITE_API_URL: ${API_URL:-https://api.neurorisk.example.com}
        VITE_API_PREFIX: ${API_PREFIX:-/api/v1}
        VITE_ENABLE_AUTH: ${ENABLE_AUTH:-true}
        VITE_APP_VERSION: ${APP_VERSION:-1.0.0}
    container_name: neurorisk-frontend
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - backend
    networks:
      - neurorisk-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Backend FastAPI Application
  backend:
    image: neurorisk-backend:latest
    container_name: neurorisk-backend
    environment:
      - APP_NAME=NeuroRiskLogic
      - APP_VERSION=${APP_VERSION:-1.0.0}
      - ENV=production
      - DATABASE_URL=postgresql://postgres:${DB_PASSWORD}@postgres:5432/neurorisk_db
      - SECRET_KEY=${SECRET_KEY}
      - API_KEY=${API_KEY}
      - CORS_ORIGINS=https://neurorisk.example.com
      - LOG_LEVEL=INFO
    ports:
      - "8000:8000"
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - ./data/models:/app/data/models
      - ./logs:/app/logs
    networks:
      - neurorisk-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: neurorisk-postgres
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=neurorisk_db
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - neurorisk-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Nginx Reverse Proxy (Main)
  nginx:
    image: nginx:alpine
    container_name: neurorisk-nginx
    ports:
      - "8080:80"
      - "8443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - frontend
      - backend
    networks:
      - neurorisk-network
    restart: unless-stopped

  # Automated Retraining Service
  retraining:
    image: neurorisk-backend:latest
    container_name: neurorisk-retraining
    command: python -m scripts.automated_retraining
    environment:
      - DATABASE_URL=postgresql://postgres:${DB_PASSWORD}@postgres:5432/neurorisk_db
      - ENABLE_INCREMENTAL_LEARNING=true
      - INCREMENTAL_RETRAIN_INTERVAL=7
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - ./data/models:/app/data/models
      - ./logs:/app/logs
    networks:
      - neurorisk-network
    restart: unless-stopped

  # Prometheus Monitoring
  prometheus:
    image: prom/prometheus:latest
    container_name: neurorisk-prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus-data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
    networks:
      - neurorisk-network
    restart: unless-stopped

  # PgAdmin for Database Management
  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: neurorisk-pgadmin
    environment:
      - PGADMIN_DEFAULT_EMAIL=${PGADMIN_EMAIL:-admin@neurorisk.com}
      - PGADMIN_DEFAULT_PASSWORD=${PGADMIN_PASSWORD}
    ports:
      - "5050:80"
    depends_on:
      - postgres
    networks:
      - neurorisk-network
    restart: unless-stopped

volumes:
  postgres-data:
  prometheus-data:

networks:
  neurorisk-network:
    driver: bridge