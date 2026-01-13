# Dockerfile
# 1. Билд стадии
FROM node:18-alpine AS builder

# Устанавливаем зависимости
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Копируем исходный код и билдим
COPY . .
RUN npm run build

# 2. Продакшен стадия
FROM nginx:alpine AS production

# Копируем билд из builder стадии
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем кастомную конфигурацию nginx (опционально)
COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]