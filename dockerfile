# Primera etapa: construir la aplicación Angular
FROM node:12.7-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Segunda etapa: servir la aplicación compilada con Nginx
# Etapa de producción
FROM nginx:alpine

# Copiar los archivos compilados de la etapa anterior a la carpeta de despliegue de Nginx
COPY --from=builder /app/dist/* /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
