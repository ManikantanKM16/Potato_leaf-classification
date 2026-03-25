# ── Stage 1: Build the React frontend ─────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (better layer caching)
COPY frontend/package*.json ./
RUN npm ci --silent

# Copy source and build for production
COPY frontend/ ./
RUN npm run build

# ── Stage 2: Serve with Nginx ─────────────────────────────────
FROM nginx:1.25-alpine

# Copy built frontend assets into Nginx's web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy our custom Nginx config
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Remove the default Nginx config
RUN rm -f /etc/nginx/conf.d/default.conf.default

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
