# Primera etapa: construir la aplicación Angular
FROM node:18-alpine
WORKDIR /app

RUN npm cache clean --force
COPY . .

RUN npm install --force
RUN npm run build --prod

CMD [ "npm", "run", "start:prod" ]
