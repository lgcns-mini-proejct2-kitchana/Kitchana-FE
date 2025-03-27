# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

ARG VITE_API_BASE_URL
COPY package*.json ./
RUN echo "VITE_API_BASE_URL=${VITE_API_BASE_URL}" > .env
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Run - nginx serving
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]