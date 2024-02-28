# Etapa de construcción
FROM node:18 as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Etapa de ejecución
FROM nginx as production
COPY --from=builder /app/dist/tera-flex /usr/share/nginx/html
# Copia la configuración personalizada de nginx
# COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
